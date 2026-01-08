import cors from "cors";

export function corsSettings() {
    // 3. Configure CORS logic
    const corsOptions = {
        // Falls back to '*' if CORS_ORIGIN is not defined in .env
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };

    return cors(corsOptions);
}
