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
const modelproxy_1 = require("modelproxy");
const inversify_1 = require("inversify");
// import * as request from "request-promise";
const request = require("request-promise");
let RequestEngine = class RequestEngine extends modelproxy_1.BaseEngine {
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
};
RequestEngine = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], RequestEngine);
exports.RequestEngine = RequestEngine;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/engines/request.js.map