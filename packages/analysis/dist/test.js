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
const index_1 = require("crawler.v5.utils/dist/services/elastic/index");
const index_2 = require("crawler.v5.utils/dist/services/rabbitmq/index");
const inversify_1 = require("inversify");
const download_1 = require("./download");
const link_1 = require("./link");
const config = {
    "pages": [{
            "key": "main-123",
            "path": "",
            "areas": [],
            "fieldKey": "",
            "fields": {
                "none": {
                    "data": [{
                            "key": "obj",
                            "selector": ["#ylNav2"],
                            "dealStrategy": "object",
                            "data": [{
                                    "key": "title",
                                    "selector": ["a.ylHdNavTt"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }, {
                                    "key": "title-1",
                                    "selector": [".ylHdNavCon a"],
                                    "dealStrategy": "array",
                                    "data": [{
                                            "key": "",
                                            "selector": [],
                                            "methodInfo": { "text": [] },
                                            "dealStrategy": "normal"
                                        }]
                                }]
                        }, {
                            "key": "cur-text",
                            "dealStrategy": "or",
                            "data": [{
                                    "selector": [".zsTobTabUl .cur a"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }, {
                                    "selector": [".key_main .key_ul .hover"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }]
                        }]
                }
            },
            "enabled": true
        }],
    "queueItem": {
        "_id": "djlflds3opidu3ur",
        "responseBody": "",
        "url": "http://www.yaolan.com",
        "path": "/"
    }
};
const config1 = {
    "queueConfig": {
        "ignoreWWWDomain": false,
        "stripWWWDomain": false,
        "scanSubdomains": true,
        "host": "www.yaolan.com",
        "initialProtocol": "http",
        "initialPort": 80,
        "stripQuerystring": true,
        "fetchConditions": [],
        "domainWhiteList": ["(.*?).yaolan.com"],
        "filterByDomain": true
    },
    "urls": ["http://www.yaolan.com", "http://bbs.yaolan.com"]
};
// process.on("UnhandledPromiseRejection", console.log);
let Test = class Test {
    constructor($downloader, $linker, $mq, $es) {
        this.$downloader = $downloader;
        this.$linker = $linker;
        this.$mq = $mq;
        this.$es = $es;
        $mq.start("yaolan", {
            protocol: "amqp",
            hostname: "localhost",
            username: "crawler",
            password: "871233"
        }, (data) => __awaiter(this, void 0, void 0, function* () {
            return this.doDeal(data.url).then((d) => {
                return d;
            }).catch((() => void (0)));
        }), 1, 3000).then(() => {
            return this.doDeal("http://www.yaolan.com").catch((() => void (0)));
        });
    }
    doDeal(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.$downloader.start(url, {}).then((data) => {
                config.queueItem.responseBody = data.responseBody;
                return this.$linker.getAllowsUrls(config.queueItem, {
                    "parseHTMLComments": false,
                    "parseScriptTags": false,
                    "allowedProtocols": ["http", "https"],
                    "whitePathList": [{ "path": "/(.*?)", "enable": true }],
                    "userAgent": "",
                    "fetchWhitelistedMimeTypesBelowMaxDepth": false,
                    "maxDepth": 0,
                    "ignoreRobots": true
                }, config1.queueConfig);
            }).then((allowUrls) => {
                return this.$es.init({
                    "host": "localhost:9200",
                    "log": [],
                    "httpAuth": "",
                    "sniffInterval": 30000,
                    "requestTimeout": 20000,
                    "keepAlive": true
                }).then(() => {
                    return allowUrls;
                });
            }).then((allowUrls) => __awaiter(this, void 0, void 0, function* () {
                yield this.$es.saveUrls(allowUrls, "yaolan", "urls");
                return this.$mq.addItemsToQueue(allowUrls);
            }));
        });
    }
};
Test = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(download_1.Downloader)),
    __param(1, inversify_1.inject(link_1.Linker)),
    __param(2, inversify_1.inject(index_2.MQueueService)),
    __param(3, inversify_1.inject(index_1.EsStoreService)),
    __metadata("design:paramtypes", [download_1.Downloader,
        link_1.Linker,
        index_2.MQueueService,
        index_1.EsStoreService])
], Test);
exports.Test = Test;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/test.js.map