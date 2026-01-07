// Using modern import syntax
import os from 'node:os';

import "./setup-dom";
import {app} from "./app"; // MUST BE FIRST

import { loadEnvFile } from 'node:process';

try {
    // Try to load local .env file
    loadEnvFile();
} catch (error: any) {
    if (error.code === 'ENOENT') {
        console.log('ℹ️ No .env file found. Using system environment variables.');
    } else {
        console.error('❌ Error loading .env file:', error.message);
    }
}
const PORT = process.env.PORT || 3000;

console.log(ShowOSName("MilSymApi"));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});


function ShowOSName(name: string): string  {
    return `Platform is ${os.platform()}.`;
};

