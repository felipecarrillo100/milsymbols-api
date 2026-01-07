import { type Format, generateSymbol, testMagic } from "../controllers/symbol/symbols";

export class SymbolService {
    async createSymbol(options: any, format: Format) {
        // You can add validation or caching logic here
        return generateSymbol(options, format);
    }

    async getTestSymbol(format: Format) {
        return testMagic(format);
    }
}

export const symbolService = new SymbolService();
