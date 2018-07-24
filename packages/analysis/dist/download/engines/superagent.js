"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = require("superagent");
const modelproxy_1 = require("modelproxy");
const inversify_1 = require("inversify");
// import chart from "superagent-charset";
// import proxy from "superagent-proxy";
// chart(request);
// proxy(request);
let SuperAgentEngine = class SuperAgentEngine extends modelproxy_1.BaseEngine {
    /**
     * 构造
     */
    constructor() {
        super();
        this.engineName = "superagent";
        this.init();
    }
    /**
     * 初始化中间件
     */
    init() {
        this.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            let { method = "" } = ctx.instance || {};
            let { data = null, settings = {}, params = null } = ctx.executeInfo || {};
            let { timeout = 5000, header = {}, charset = "utf-8", proxyInfo = "" } = settings || {};
            try {
                let curReq = superagent_1.default(method.toString() || "get", this.getFullPath(ctx.instance, ctx.executeInfo)).withCredentials();
                // 代理
                if (proxyInfo) {
                    curReq.proxy(`http://${proxyInfo}`);
                }
                // 参数
                if (params) {
                    curReq.query(params);
                }
                // 数据
                if (data) {
                    curReq.send(data);
                }
                // headers
                if (header) {
                    curReq.set(header);
                }
                // 超时时间
                curReq.timeout({
                    response: timeout,
                    deadline: 60000
                });
                // 字符编码
                if (charset) {
                    curReq.charset(charset);
                }
                ctx.result = yield curReq;
                ctx.result.body = ctx.result.text;
            }
            catch (e) {
                ctx.err = e;
                ctx.isError = true;
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
};
SuperAgentEngine = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SuperAgentEngine);
exports.SuperAgentEngine = SuperAgentEngine;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/engines/superagent.js.map