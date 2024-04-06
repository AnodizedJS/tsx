/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
type BeforeResponseEvent = {
    outputBuffer: string;
    request: IncomingMessage;
    response: ServerResponse;
};
export declare class AnodizedCssPlugin {
    onBeforeResponse(event: BeforeResponseEvent): BeforeResponseEvent;
}
export declare class CssMap {
    static componentCss: Record<any, string>;
    static getFullCss(): string;
}
export declare function ComponentStyle(key: any, source: string): void;
export {};
