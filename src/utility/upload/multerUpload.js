// src/utils/upload/multerLocal.js
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

/**
 * Create a dynamic multer uploader for local storage.
 * Keeps consistent fileName / filePath / fileUrl output.
 */
export function localUploader(
  folder = "uploads",
  field = "file",
  multiple = false,
  maxCount = 5
) {
  const uploadPath = path.join(process.cwd(), "public", folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      const fileName = `${base}-${Date.now()}${ext}`;

      // Attach useful fields
      file.finalName = fileName;
      file.filePath = `${folder}/${fileName}`;
      file.fileUrl = `${folder}/${fileName}`;

      cb(null, fileName);
    }
  });

  const uploader = multer({ storage });

  // -----------------------------
  // SMART MODE SELECTION
  // -----------------------------

  // ✅ CASE 1: multiple named fields (fields())
  // field = [{ name: "logo", maxCount: 1 }, { name: "project_logo", maxCount: 1 }]
  if (Array.isArray(field)) {
    return uploader.fields(
      field.map(f => ({
        name: f.name,
        maxCount: Number(f.maxCount) || 1
      }))
    );
  }

  // ✅ CASE 2: multiple files, same field (array)
  // field = "images", multiple = true
  if (multiple === true) {
    return uploader.array(field, maxCount);
  }

  // ✅ CASE 3: single file
  // field = "logo"
  return uploader.single(field);
}