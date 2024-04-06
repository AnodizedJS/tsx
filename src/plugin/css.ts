import { IncomingMessage, ServerResponse } from 'http'

type BeforeResponseEvent = {
    outputBuffer: string,
    request: IncomingMessage,
    response: ServerResponse
}

export class AnodizedCssPlugin {
    onBeforeResponse(event: BeforeResponseEvent): BeforeResponseEvent {
        event.outputBuffer += CssMap.getFullCss();
        return event;
    }
}

export class CssMap
{
    public static componentCss: Record<any,string> = {};

    public static getFullCss() : string
    {
        let html = ''; // initialise with empty.

        // other css loading mechanisms here.
        
        if (Object.keys(CssMap.componentCss).length != 0) {
            // add component css last as we want this to be the "governing" ruleset.
            html += `<style>${Object.values(CssMap.componentCss).join('\n\n')}</style>`;
        }

        return html.replace('<style></style>', '').replace('<script></script>', '');
    }
}

export function ComponentStyle(key: any, source: string) {
    CssMap.componentCss[key] = source;
}