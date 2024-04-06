/// <reference types="node" />
import { IncomingMessage } from 'http';
import { BeforeResponseEvent } from './types';
export declare class AnodizedCssHttpPlugin {
    onRequest(res: IncomingMessage): void;
    onBeforeResponse(event: BeforeResponseEvent): void;
}
