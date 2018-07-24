import { ModelProxy, BaseEngine } from "modelproxy";
import { inject, injectable, multiInject } from "inversify";

export { PhantomEngine } from "./engines/phantom";
export { SuperAgentEngine } from "./engines/superagent";
export { RequestEngine } from "./engines/request";

@injectable()
export class Downloader {
    constructor(@inject(ModelProxy) private $proxy: ModelProxy, @multiInject("ModelProxyEngine") engines: (BaseEngine<any> & { engineName: string })[]) {
        engines.forEach((engine: BaseEngine<any> & { engineName: string }) => {
            $proxy.addEngines({
                [engine.engineName]: engine,
            });
        });
    }

    public async start(url: string, settings: any, engine = "request"): Promise<{ headers: any, responseBody: string, statusCode: number }> {
        this.$proxy.loadConfig({
            "engine": engine,
            "interfaces": [{
                "key": "download",
                "method": "get",
                "path": "",
                "title": ""
            }],
            "key": "download",
            "state": "html",
            "states": {
                "html": url
            },
            "title": "download下载接口",
        }, {});

        const res = await this.$proxy.execute("download", "download", {
            settings
        });

        return {
            headers: res.headers,
            responseBody: res.body,
            statusCode: res.statusCode,
        };
    }
}

// /**
//  * 下载内容
//  * @param queueItem 链接的信息
//  * @param settings  设置
//  * @param engine    使用engine
//  */
// export const downloadUrl = async (url: string, settings: any, engine = "request") => {
//     proxy.loadConfig({
//         "engine": engine,
//         "interfaces": [{
//             "key": "download",
//             "method": "get",
//             "path": "",
//             "title": ""
//         }],
//         "key": "download",
//         "state": "html",
//         "states": {
//             "html": url
//         },
//         "title": "download下载接口",
//     }, {});

//     let res = await proxy.execute("download", "download", {
//         settings
//     });

//     return {
//         header: res.headers,
//         responseBody: res.body,
//         statusCode: res.statusCode,
//     };
// };
