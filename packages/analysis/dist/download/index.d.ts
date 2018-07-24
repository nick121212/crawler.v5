import { ModelProxy, BaseEngine } from "modelproxy";
import { Tracer } from "tracer";
export { PhantomEngine } from "./engines/phantom";
export { SuperAgentEngine } from "./engines/superagent";
export { RequestEngine } from "./engines/request";
export { PicDownEngine } from "./engines/picdown";
export declare class Downloader {
    private $proxy;
    private $logger;
    constructor($proxy: ModelProxy, engines: (BaseEngine<any> & {
        engineName: string;
    })[], $logger: Tracer.Logger);
    start(url: string, settings?: any, engine?: string): Promise<{
        headers: any;
        responseBody: string;
        statusCode: number;
    }>;
    /**
     * 获取当前链接的详细链接
     * @param url       链接
     * @param settings  参数
     */
    getFullUrl(url: string, settings?: any): string;
}
