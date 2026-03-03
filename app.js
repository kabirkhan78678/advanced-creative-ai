import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath, pathToFileURL } from "url";
import { swaggerDocs } from "./src/config/swagger.js";

const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "src/views"));
app.use("/", express.static(path.join(process.cwd(), "public")));

/* =========================
   ES MODULE FIX
========================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   ROUTE LOADER CONFIG
========================= */

const MODULES_DIR = path.join(__dirname, "src/modules");

if (!fs.existsSync(MODULES_DIR)) {
  console.error("❌ Modules directory not found:", MODULES_DIR);
  process.exit(1);
}

let ROUTE_COUNT = 0;

console.log("====================================");
console.log("    AUTO ROUTE LOADER STARTED");
console.log("====================================");

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Backend is running ✅</h2>
    <p>Total Mounted Routes: ${ROUTE_COUNT}</p>
    <p><a href="/api-docs">Open Swagger Docs</a></p>
  `);
});

/* =========================
   AUTO ROUTE LOADER
========================= */

async function loadRoutes(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await loadRoutes(fullPath);
      continue;
    }

    if (item.endsWith(".routes.js") || item === "routes.js") {
      try {
        const fileUrl = pathToFileURL(fullPath).href;
        const moduleRoute = await import(fileUrl);

        // 🔥 CLEAN RELATIVE PATH
        const relativePath = path
          .relative(MODULES_DIR, fullPath)
          .replace(/\\/g, "/");

        const cleanedPath = relativePath
          .replace(/\.routes\.js$/, "")
          .replace(/routes\.js$/, "")
          .replace(/\/$/, "");

        const finalPath = `/api/${cleanedPath}`;

        app.use(finalPath, moduleRoute.default);

        ROUTE_COUNT++;
        console.log(`✔ Mounted: ${finalPath}`);
      } catch (err) {
        console.log(`❌ Error loading: ${fullPath}`);
        console.log(err);
      }
    }
  }
}

await loadRoutes(MODULES_DIR);

console.log("====================================");
console.log(` TOTAL ROUTES LOADED: ${ROUTE_COUNT}`);
console.log("====================================");

/* =========================
   SWAGGER
========================= */

swaggerDocs(app);

export default app;