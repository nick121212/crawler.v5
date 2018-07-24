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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var phantom_1 = require("./engines/phantom");
exports.PhantomEngine = phantom_1.PhantomEngine;
var superagent_1 = require("./engines/superagent");
exports.SuperAgentEngine = superagent_1.SuperAgentEngine;
var request_1 = require("./engines/request");
exports.RequestEngine = request_1.RequestEngine;
let Downloader = class Downloader {
    constructor($proxy, engines) {
        this.$proxy = $proxy;
        engines.forEach((engine) => {
            $proxy.addEngines({
                [engine.engineName]: engine,
            });
        });
    }
    start(url, settings, engine = "request") {
        return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield this.$proxy.execute("download", "download", {
                settings
            });
            return {
                headers: res.headers,
                responseBody: res.body,
                statusCode: res.statusCode,
            };
        });
    }
};
Downloader = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(modelproxy_1.ModelProxy)), __param(1, inversify_1.multiInject("ModelProxyEngine")),
    __metadata("design:paramtypes", [modelproxy_1.ModelProxy, Array])
], Downloader);
exports.Downloader = Downloader;
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
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/index.js.map