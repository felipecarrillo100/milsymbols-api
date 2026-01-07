import "./config/setup-dom";

import {app} from "./app";
import {safeLoadEnv} from "./config/loadEnv"; // MUST BE FIRST

safeLoadEnv();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

