/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
export type BeforeResponseEvent = {
    outputBuffer: string;
    request: IncomingMessage;
    response: ServerResponse;
};
