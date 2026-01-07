import path from 'node:path';
import express from "express";
import symbolRoutes from "./routes/symbol.routes";

export const app = express();
app.use(express.json());

// Serve static files from the 'public' folder
// This handles the request to "/" by automatically looking for "index.html"
app.use(express.static(path.join(import.meta.dirname, '../public')))

// Routes
app.use("/", symbolRoutes);
