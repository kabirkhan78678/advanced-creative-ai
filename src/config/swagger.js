import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Creative Advanced API",
            version: "1.0.0",
            description: "Enterprise Auth API Documentation"
        },
        servers: [
            {
                url: "http://localhost:9000/api"
            }
        ]
    },
    apis: [path.join(process.cwd(), "src/modules/**/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};