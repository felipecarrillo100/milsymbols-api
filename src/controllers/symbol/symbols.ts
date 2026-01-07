import MS from "milsymbol";

// Helper to generate milsymbol output
import {base64ToBuffer} from "../utils/base64ToBuffer";
import {mapSymbolParams} from "./mapSymbolParams";

// Supported formats
export const FORMATS = ["svg", "png", "json"] as const;
export type Format = typeof FORMATS[number];

export function generateSymbol(optionsIn: any, format: Format) {
    const options = mapSymbolParams(optionsIn);
    const symbol = new MS.Symbol(optionsIn.code, options);

    switch (format) {
        case "svg":
            return symbol.asSVG();

        case "png": {
            const canvas = symbol.asCanvas();
            const base64Url = canvas.toDataURL("image/png");
            return base64ToBuffer(base64Url);
        }

        case "json":
            return symbol.getProperties();

        default:
            throw new Error("Unsupported format");
    }
}

export function testMagic(format: string) {
    const symbol = new MS.Symbol("130315003611010300000000000000", {
        size: 35,
        // @ts-ignore
        quantity: 200,
        staffComments: "for reinforcements".toUpperCase(),
        additionalInformation: "added support for JJ".toUpperCase(),
        direction: (750 * 360) / 6400,
        type: "machine gun".toUpperCase(),
        dtg: "30140000ZSEP97",
        location: "0900000.0E570306.0N",
    });

    switch (format) {
        case "png":
            const canvas = symbol.asCanvas();
            const base64Url = canvas.toDataURL("image/png");
            return base64ToBuffer(base64Url);
        case "svg":
            return symbol.asSVG();
        case "json":
            return symbol.getProperties();
        default:
            throw new Error("Unsupported format");
    }
}
