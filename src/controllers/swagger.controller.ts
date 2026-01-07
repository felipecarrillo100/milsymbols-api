import { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { getDynamicSwaggerDoc } from "../config/swagger.js";

// Named export for the static assets middleware
export const serveDocs = swaggerUi.serve;

// Named export for the HTML generation middleware
export const setupDocs = (req: Request, res: Response, next: NextFunction) => {
    const dynamicDoc = getDynamicSwaggerDoc(req);
    return swaggerUi.setup(dynamicDoc)(req, res, next);
};

/**
 * Returns the raw JSON definition of the OpenAPI spec.
 * This is the standard best practice for machine-readability.
 */
export const getJsonDefinition = (req: Request, res: Response) => {
    const dynamicDoc = getDynamicSwaggerDoc(req);

    // Explicitly setting the content-type helps tools like Postman
    // or Swagger Editor recognize it immediately.
    res.setHeader("Content-Type", "application/json");
    res.json(dynamicDoc);
};
