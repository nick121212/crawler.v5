import { BaseEngine } from "modelproxy";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import { IInterfaceModel } from "modelproxy/out/models/interface";
import { IExecute } from "modelproxy/out/models/execute";
import { injectable } from "inversify";
import * as fs from "fs";
import { FetchEngine } from "modelproxy-engine-fetch";
import * as _ from "lodash";


// tslint:disable-next-line:no-unused-expression
new FetchEngine();

@injectable()
export class PicDownEngine extends BaseEngine<any> {
    public engineName = "picdown";
    /**
     * 构造
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * 初始化中间件
     */
    public init(): void {
        this.use(async (ctx: IProxyCtx, next: Function): Promise<any> => {
            let { settings = {}, params = {} } = ctx.executeInfo || {};
            let { header = {}, proxyInfo = "" } = settings || {};
            let searchParams = new URLSearchParams();

            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    searchParams.append(key, params[key]);
                }
            });

            try {
                ctx.result = await this.house(this.getFullPath(ctx.instance as any, ctx.executeInfo as any), header, proxyInfo);
            } catch (e) {
                ctx.err = e;
                ctx.isError = true;
            }

            await next();
        });
    }

    /**
     * 调用接口
     * @param instance 接口的实例
     * @param options  参数
     */
    public async proxy(instance: IInterfaceModel, options: IExecute): Promise<any> {
        const fn = this.callback();
        const ctx: IProxyCtx = {
            instance: instance,
            executeInfo: options,
        };

        await fn(ctx);

        if (ctx.isError) {
            console.log((ctx.err as Error).message);
            throw ctx.err;
        }

        return ctx.result;
    }


    private house(url: string, headers: any, _proxyInfo: string): Promise<any> {

        return fetch(url, {
            headers
        }).then(async (res: Response) => {
            if (res.ok && res.status === 200 && res.body) {
                const fileExt = res.headers.get("content-type") || "jpeg";
                const dest = fs.createWriteStream("/srv/pictures/" + encodeURIComponent(url) + "." + _.last(fileExt.split("/")));

                return new Promise((resolve, reject) => {
                    if (res.body) {
                        (res.body as any).pipe(dest);

                        dest.on("finish", () => {
                            resolve(res);
                        });
                        dest.on("error", err => {
                            reject(err);
                        });
                    }
                });
            }

            return res;
        });
        // let horseman: any,
        //     horsemanSetting: any = {
        //         timeout: 30000,
        //         loadImages: false,
        //         ignoreSSLErrors: true
        //     },
        //     resources: any = {};

        // if (proxyInfo) {
        //     horsemanSetting.proxy = proxyInfo;
        //     horsemanSetting.proxyType = "http";
        // }

        // return new Promise((resolve, reject) => {
        //     let rtn = { statusCode: 0, body: "" };

        //     horseman = new Horseman(horsemanSetting);

        //     horseman
        //         .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) Safari/538.")
        //         .on("resourceReceived", (res: any) => {
        //             console.log(res);
        //             resources[res.url] = res;
        //         })
        //         .on("resourceRequested", (req: any) => {
        //             console.log("Request " + JSON.stringify(req, undefined, 4));
        //         })
        //         .headers(headers)
        //         .download(url, "/srv/pictures/a.jpeg")
        //         .close()
        //         .then(() => {
        //             resolve(rtn);
        //         }).catch((err: Error) => {
        //             console.log(err);
        //             reject(err);
        //         });
        // });
    }
}
