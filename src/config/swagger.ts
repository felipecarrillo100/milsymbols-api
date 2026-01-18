import * as fs from "node:fs";
import path from 'node:path';
import yaml from "js-yaml";
import { type JsonObject } from "swagger-ui-express";
import { Request } from "express";

// Load the YAML file once during startup
const swaggerPath = path.join(__dirname, "../swagger/swagger.yml");
const swaggerFile = fs.readFileSync(swaggerPath, "utf8");
const baseDocument = yaml.load(swaggerFile) as JsonObject;

/**
 * Generates a dynamic Swagger document based on the current request.
 * This ensures the "Try it out" feature uses the correct host/protocol.
 */
export const getDynamicSwaggerDoc = (req: Request): JsonObject => {
    const host = req.get('host');
    const protocol = req.protocol;

    return {
        ...baseDocument,
        servers: [
            {
                url: `${protocol}://${host}`,
                description: 'Dynamic Server (Auto-detected)'
            }
        ]
    };
};
