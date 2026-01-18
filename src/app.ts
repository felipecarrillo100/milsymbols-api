import path from 'node:path';
import express from "express";
import symbolRoutes from "./routes/symbol.routes";
import { corsSettings } from "./config/corsSettings";


export function creatApp() {
    const app = express();
    app.use(corsSettings()); // Enable CORS middleware
    app.use(express.json());

    // Serve static files from the 'public' folder
    // This handles the request to "/" by automatically looking for "index.html"
    app.use(express.static(path.join(__dirname, '../public')))

    // Routes
    app.use("/", symbolRoutes);
    return app;
}
