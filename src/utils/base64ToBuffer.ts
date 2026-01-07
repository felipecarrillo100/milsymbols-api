export function base64ToBuffer(base64Image: string): Buffer {
    // Remove "data:image/png;base64," if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}
