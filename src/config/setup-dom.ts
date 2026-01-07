import { JSDOM } from "jsdom";

let domInstance: JSDOM | null = null;

/**
 * Initializes the JSDOM environment and patches the global Node.js scope.
 * This is required for milsymbol to function in a server-side environment.
 */
export function initVirtualDOM() {
    // Return existing instance if already initialized
    if (domInstance) {
        return {
            window: domInstance.window,
            dom: domInstance
        };
    }

    domInstance = new JSDOM(`<!DOCTYPE html><html lang="en"><body></body></html>`, {
        pretendToBeVisual: true
    });

    const { window } = domInstance;
    const g = global as any;

    // Inject browser globals into Node.js global scope
    g.window = window;
    g.document = window.document;
    g.navigator = window.navigator;
    g.Node = window.Node;
    g.Element = window.Element;
    g.SVGElement = window.SVGElement;
    g.HTMLCanvasElement = window.HTMLCanvasElement;
    g.Image = window.Image;

    // Fix for milsymbol's specific SVG requirement
    g.document.createElementNS = (ns: string, tagName: string) => {
        return window.document.createElementNS(ns, tagName);
    };

    return { window, dom: domInstance };
}

// Export the types for use elsewhere
export type DOMEnvironment = ReturnType<typeof initVirtualDOM>;
