import { ModelProxy, BaseEngine } from "modelproxy";
export { PhantomEngine } from "./engines/phantom";
export { SuperAgentEngine } from "./engines/superagent";
export { RequestEngine } from "./engines/request";
export declare class Downloader {
    private $proxy;
    constructor($proxy: ModelProxy, engines: (BaseEngine<any> & {
        engineName: string;
    })[]);
    start(url: string, settings: any, engine?: string): Promise<{
        headers: any;
        responseBody: string;
        statusCode: number;
    }>;
}
