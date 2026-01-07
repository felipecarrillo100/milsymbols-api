import { Router } from "express";
import * as symbolController from "../controllers/symbol.controller.js";
import * as swaggerController from "../controllers/swagger.controller.js";

const router = Router();

// --- Swagger UI ---
// .use handles the CSS/JS files (e.g., /api-docs/swagger-ui.css)
router.use("/api-docs", swaggerController.serveDocs);
// .get handles the actual HTML page
router.get("/api-docs", swaggerController.setupDocs);

router.get("/symbol", symbolController.getSymbol);
router.post("/symbol", symbolController.postSymbol);
router.get("/test", symbolController.getTestSymbol);

export default router;
