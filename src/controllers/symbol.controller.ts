import { Request, Response } from "express";
import { symbolService } from "../services/symbol.service.js";
import { type Format, FORMATS } from "./symbol/symbols";

export const getSymbol = async (req: Request, res: Response) => {
    const format = (req.query.format as string)?.toLowerCase() || "svg";

    if (!FORMATS.includes(format as Format)) {
        return res.status(400).send({ error: "Invalid format" });
    }

    try {
        const result = await symbolService.createSymbol(req.query, format as Format);
        sendSymbolResponse(res, result, format as Format);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Properly implemented POST controller
 * Uses req.body for symbol options
 */
export const postSymbol = async (req: Request, res: Response) => {
    // 1. Extract format from body (or default to svg)
    const format = (req.body.format as string)?.toLowerCase() || "svg";

    // 2. Validate format
    if (!FORMATS.includes(format as Format)) {
        return res.status(400).send({ error: "Invalid format" });
    }

    try {
        // 3. Pass the entire body as options to the service
        const result = await symbolService.createSymbol(req.body, format as Format);

        // 4. Return response using the DRY helper
        sendSymbolResponse(res, result, format as Format);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getTestSymbol = async (req: Request, res: Response) => {
    const format = (req.query.format as string)?.toLowerCase() || "svg";

    if (!FORMATS.includes(format as Format)) {
        return res.status(400).send({ error: "Invalid format" });
    }

    try {
        const result = await symbolService.getTestSymbol(format as Format);
        sendSymbolResponse(res, result, format as Format);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


// Helper to DRY up your response logic
function sendSymbolResponse(res: Response, data: any, format: Format) {
    const contentTypes = { svg: "image/svg+xml", png: "image/png", json: "application/json" };
    res.setHeader("Content-Type", contentTypes[format]);
    format === "json" ? res.json(data) : res.send(data);
}
