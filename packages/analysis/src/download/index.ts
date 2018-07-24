import { ModelProxy, BaseEngine } from "modelproxy";
import { inject, injectable, multiInject, tagged } from "inversify";
import { IInterfaceModel } from "modelproxy/out/models/interface";
import { Tracer } from "tracer";

export { PhantomEngine } from "./engines/phantom";
export { SuperAgentEngine } from "./engines/superagent";
export { RequestEngine } from "./engines/request";
export { PicDownEngine } from "./engines/picdown";

@injectable()
export class Downloader {
    constructor(
        @inject(ModelProxy) private $proxy: ModelProxy,
        @multiInject("ModelProxyEngine") engines: (BaseEngine<any> & { engineName: string })[],
        @inject("log") @tagged("color", true) private $logger: Tracer.Logger
    ) {
        engines.forEach((engine: BaseEngine<any> & { engineName: string }) => {
            $proxy.addEngines({
                [engine.engineName]: engine,
            });
        });

        this.$proxy.loadConfig({
            "interfaces": [{
                "key": "download",
                "method": "get",
                "path": "",
                "title": ""
            }],
            "key": "download",
            "state": "html",
            "title": "download下载接口",
        }, {});
    }

    public async start(url: string, settings: any = {}, engine = "request"): Promise<{ headers: any, responseBody: string, statusCode: number }> {
        const res = await this.$proxy.execute("download", "download", {
            ...settings,
            instance: {
                "engine": engine,
                "states": {
                    "html": url
                }
            }
        });

        this.$logger.info(url);

        return {
            headers: res.headers,
            responseBody: res.body,
            statusCode: res.statusCode,
        };
    }

    /**
     * 获取当前链接的详细链接
     * @param url       链接
     * @param settings  参数
     */
    public getFullUrl(url: string, settings: any = {}): string {
        const ns = this.$proxy.getNs("download");
        const inter: IInterfaceModel | null = ns.get("download");

        if (inter) {
            return inter.getFullPath({
                ...settings,
                instance: {
                    "states": {
                        "html": url
                    }
                }
            });
        }

        return "";
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
