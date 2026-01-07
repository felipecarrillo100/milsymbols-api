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
