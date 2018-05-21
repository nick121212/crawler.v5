import { BaseEngine } from "modelproxy";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import { IInterfaceModel } from "modelproxy/out/models/interface";
import { IExecute } from "modelproxy/out/models/execute";
// import * as request from "request-promise";

const request = require("request-promise");

export class RequestEngine extends BaseEngine {
    public engineName = "request";
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
            let { method = "" } = ctx.instance || {};
            let { data = null, settings = {}, params = {} } = ctx.executeInfo || {};
            let { timeout = 5000, header = {}, charset = "utf-8", proxyInfo = "" } = settings || {};
            let searchParams = new URLSearchParams();

            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    searchParams.append(key, params[key]);
                }
            });

            try {
                ctx.result = await request(this.getFullPath(ctx.instance as any, ctx.executeInfo as any), {
                    method: method.toString(),
                    body: data,
                    proxy: proxyInfo ? `http://${proxyInfo}` : null,
                    charset: charset || "auto",
                    json: true,
                    headers: header,
                    resolveWithFullResponse: true,
                    timeout: timeout
                }, undefined);
            } catch (e) {
                ctx.err = e;
                ctx.isError = true;
                console.error(e);
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
            throw ctx.err;
        }

        return ctx.result;
    }
}
