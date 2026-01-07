import { loadEnvFile } from 'node:process';


export function safeLoadEnv() {
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

}
