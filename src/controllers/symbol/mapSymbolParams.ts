import type {ColorMode, SymbolOptions} from "milsymbol";

const num = (v: any): number | undefined =>
    v !== undefined && v !== "" && !isNaN(Number(v)) ? Number(v) : undefined;

const bool = (v: any): boolean | undefined =>
    v === true || v === "true" || v === "1";

const str = (v: any): string | undefined =>
    typeof v === "string" && v.length > 0 ? v : undefined;

const boolTrueOnly = (v: any): boolean | undefined =>
    v === true || v === "true" || v === "1" ? true : undefined;

export function mapSymbolParams(q: any): SymbolOptions {
    // @ts-ignore
    return removeUndefined({
        // ────────── MIL-STD text modifiers ──────────
        additionalInformation: str(q.additionalInformation),
        altitudeDepth: str(q.altitudeDepth),
        combatEffectiveness: str(q.combatEffectiveness),
        commonIdentifier: str(q.commonIdentifier),
        dtg: str(q.dtg),
        equipmentTeardownTime: str(q.equipmentTeardownTime),
        evaluationRating: str(q.evaluationRating),
        headquartersElement: str(q.headquartersElement),
        higherFormation: str(q.higherFormation),
        hostile: str(q.hostile),
        iffSif: str(q.iffSif),
        location: str(q.location),
        platformType: str(q.platformType),
        reinforcedReduced: str(q.reinforcedReduced),
        sigint: str(q.sigint),
        signatureEquipment: str(q.signatureEquipment),
        specialHeadquarters: str(q.specialHeadquarters),
        speed: str(q.speed),
        staffComments: str(q.staffComments)?.toUpperCase(),
        type: str(q.type)?.toUpperCase(),
        uniqueDesignation: str(q.uniqueDesignation),

        // ────────── Numeric semantic modifiers ──────────
        // @ts-ignore
        quantity: num(q.quantity),
        direction: num(q.direction),

        // ────────── Rendering controls ──────────
        size: num(q.size),
        fill: typeof q.fill === "undefined" ? true : bool(q.fill),
        fillOpacity: num(q.fillOpacity),
        frame: boolTrueOnly(q.frame),
        icon: boolTrueOnly(q.icon),
        infoFields: boolTrueOnly(q.infoFields),

        // // ────────── Styling ──────────
        colorMode: mapColorMode(q.colorMode),
        monoColor: str(q.monoColor),
        outlineColor: str(q.outlineColor),
        outlineWidth: num(q.outlineWidth),
        strokeWidth: num(q.strokeWidth),
        infoColor: str(q.infoColor),
        infoSize: num(q.infoSize),
        hqStafLength: num(q.hqStafLength),

        // ────────── Rare flags ──────────
        alternateMedal: boolTrueOnly(q.alternateMedal),
        civilianColor: boolTrueOnly(q.civilianColor),
    });
}

function mapColorMode(v: any): ColorMode | string | undefined {
    if (v === undefined || v === null || v === "") return undefined;

    // String form → allowed by API, pass through
    if (typeof v === "string") {
        return v;
    }

    // Object form → must fully match ColorMode
    if (typeof v === "object") {
        const {
            civilian,
            friend,
            hostile,
            neutral,
            unknown
        } = v;

        if (
            typeof civilian === "string" &&
            typeof friend === "string" &&
            typeof hostile === "string" &&
            typeof neutral === "string" &&
            typeof unknown === "string"
        ) {
            return { civilian, friend, hostile, neutral, unknown };
        }

        // Partial / malformed → reject
        return undefined;
    }

    return undefined;
}

function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    for (const key in obj) {
        if (obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }

    return result;
}
