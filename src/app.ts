import * as fs from "node:fs";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from "express";
import swaggerUi, {type JsonObject} from "swagger-ui-express";
import yaml from "js-yaml";

import {type Format, FORMATS, generateSymbol, testMagic} from "./utils/symbols";

export const app = express();
app.use(express.json());

// Read YAML file content
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, "swagger/swagger.yml");
const swaggerFile = fs.readFileSync(swaggerPath, "utf8");

// Parse YAML content into JS object
const swaggerDocument = yaml.load(swaggerFile) as JsonObject;

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files from the 'public' folder
// This handles the request to "/" by automatically looking for "index.html"
app.use(express.static(path.join(import.meta.dirname, '../public')))

// ------------------- GET /symbol -------------------
app.get("/symbol", (req, res) => {
    const options = { ...req.query };

    const format = (options.format as string)?.toLowerCase() || "svg";
    if (!FORMATS.includes(format as Format)) {
        return res.status(400).send({ error: "Invalid format" });
    }

    try {
        const result = generateSymbol(options, format as Format);

        if (format === "svg") {
            res.setHeader("Content-Type", "image/svg+xml");
            res.send(result);
        } else if (format === "png") {
            res.setHeader("Content-Type", "image/png");
            res.send(result);
        } else {
            res.json(result);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// ------------------- POST /symbol -------------------
app.post("/symbol", (req, res) => {
    const options = req.body;
    const format = (options.format as string)?.toLowerCase() || "svg";

    if (!FORMATS.includes(format as Format)) {
        return res.status(400).send({ error: "Invalid format" });
    }

    try {
        const result = generateSymbol(options, format as Format);

        if (format === "svg") {
            res.setHeader("Content-Type", "image/svg+xml");
            res.send(result);
        } else if (format === "png") {
            res.setHeader("Content-Type", "image/png");
            res.send(result);
        } else {
            res.json(result);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// ------------------- GET /symbol -------------------
app.get("/test", (req, res) => {
    const options = { ...req.query };

    const format = (options.format as string)?.toLowerCase() || "svg";
    try {
        const result = testMagic(format as Format);
        if (format === "svg") {
            res.setHeader("Content-Type", "image/svg+xml");
            res.send(result);
        } else if (format === "png") {
            res.setHeader("Content-Type", "image/png");
            res.send(result);
        } else {
            res.json(result);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});



