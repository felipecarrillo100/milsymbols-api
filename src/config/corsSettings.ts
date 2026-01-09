import cors from "cors";

export function corsSettings() {
    // 1. Get the string from .env (e.g., "Content-Type,Authorization,X-Test-Header")
    // 2. Split by comma and trim whitespace to create an array
    const customHeaders = process.env.CORS_ALLOWED_HEADERS
        ? process.env.CORS_ALLOWED_HEADERS.split(',').map(h => h.trim())
        : ['Content-Type', 'Authorization']; // Default fallback

    // 3. Configure CORS logic
    const corsOptions = {
        // Falls back to '*' if CORS_ORIGIN is not defined in .env
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        exposedHeaders: customHeaders
    };

    return cors(corsOptions);
}
