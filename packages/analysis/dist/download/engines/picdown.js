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
const Horseman = require("node-horseman");
let PicDownEngine = class PicDownEngine extends modelproxy_1.BaseEngine {
    /**
     * 构造
     */
    constructor() {
        super();
        this.engineName = "picdown";
        this.init();
    }
    /**
     * 初始化中间件
     */
    init() {
        this.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            let { settings = {}, params = {} } = ctx.executeInfo || {};
            let { header = {}, proxyInfo = "" } = settings || {};
            let searchParams = new URLSearchParams();
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    searchParams.append(key, params[key]);
                }
            });
            try {
                ctx.result = yield this.house(this.getFullPath(ctx.instance, ctx.executeInfo), header, proxyInfo);
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
                console.log(ctx.err.message);
                throw ctx.err;
            }
            return ctx.result;
        });
    }
    house(url, headers, proxyInfo) {
        let horseman, horsemanSetting = {
            timeout: 30000,
            loadImages: false,
            ignoreSSLErrors: true
        }, resources = {};
        if (proxyInfo) {
            horsemanSetting.proxy = proxyInfo;
            horsemanSetting.proxyType = "http";
        }
        return new Promise((resolve, reject) => {
            let rtn = { statusCode: 0, body: "" };
            horseman = new Horseman(horsemanSetting);
            horseman
                .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) Safari/538.")
                .on("resourceReceived", (res) => {
                console.log(res);
                resources[res.url] = res;
            })
                .on("resourceRequested", (req) => {
                console.log("Request " + JSON.stringify(req, undefined, 4));
            })
                .headers(headers)
                .open(url)
                .wait(500)
                .status()
                .then((statusCode) => {
                rtn.statusCode = statusCode;
            })
                .html()
                .then((body) => {
                rtn.body = body;
            })
                .close()
                .then(() => {
                resolve(rtn);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
};
PicDownEngine = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], PicDownEngine);
exports.PicDownEngine = PicDownEngine;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/engines/picdown.js.map