var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseEngine } from "modelproxy";
// import * as request from "request-promise";
const request = require("request-promise");
export class RequestEngine extends BaseEngine {
    /**
     * 构造
     */
    constructor() {
        super();
        this.engineName = "request";
        this.init();
    }
    /**
     * 初始化中间件
     */
    init() {
        this.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
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
                ctx.result = yield request(this.getFullPath(ctx.instance, ctx.executeInfo), {
                    method: method.toString(),
                    body: data,
                    proxy: proxyInfo ? `http://${proxyInfo}` : null,
                    charset: charset || "auto",
                    json: true,
                    headers: header,
                    resolveWithFullResponse: true,
                    timeout: timeout
                }, undefined);
            }
            catch (e) {
                ctx.err = e;
                ctx.isError = true;
                console.error(e);
            }
            yield next();
        }));
    }
    /**
     * 调用接口
     * @param instance 接口的实例
     * @param options  参数
     */
    proxy(instance, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fn = this.callback();
            const ctx = {
                instance: instance,
                executeInfo: options,
            };
            yield fn(ctx);
            if (ctx.isError) {
                throw ctx.err;
            }
            return ctx.result;
        });
    }
}
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/engines/request.js.map