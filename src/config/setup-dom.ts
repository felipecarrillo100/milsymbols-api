import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    pretendToBeVisual: true // Helps with layout-related calculations
});

const { window } = dom;

// Inject browser globals into Node.js global scope
(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = window.navigator;
(global as any).Node = window.Node;
(global as any).Element = window.Element;
(global as any).SVGElement = window.SVGElement;
(global as any).HTMLCanvasElement = window.HTMLCanvasElement;
(global as any).Image = window.Image;

// Fix for milsymbol specifically needing createElementNS for SVGs
(global as any).document.createElementNS = (ns: string, tagName: string) => {
    return window.document.createElementNS(ns, tagName);
};

export { window, dom };
