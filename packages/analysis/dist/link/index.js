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
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const queue_1 = require("./queue");
const discover_1 = require("./discover");
let Linker = class Linker {
    /**
     * 构造函数
     * @param  {Trace.Logger} $logger 日志服务
     */
    constructor($logger) {
        this.$logger = $logger;
        this.$logger.info("linker constructor");
    }
    /**
     * 把地址转换成uri的格式
     * @param {String[]}       urls         地址
     * @param {IQueueItem}     queueItem    当前的地址
     * @param {QueueSettings}  queueConfig  地址合法性的规则
     */
    formatUrlsToUri(urls, queueItem, queueConfig) {
        const queue = new queue_1.Queue(queueConfig);
        const allowUrls = lodash_1.default.map(urls, (url) => {
            return queue.queueURL(url, queueItem || {});
        });
        this.$logger.debug("formatUrlsToUri", allowUrls);
        return lodash_1.default.filter(allowUrls, (q) => {
            return !!q;
        });
    }
    /**
     * 从queueItem的responseBody中提取合法的地址
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {DiscoverSettings} discoverConfig  发现地址的规则
     * @param  {QueueSettings}    queueConfig     地址合法性的规则
     */
    getAllowsUrls(queueItem, discoverConfig, queueConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const discoverLink = new discover_1.DiscoverLinks(discoverConfig);
            const queue = new queue_1.Queue(queueConfig);
            const urls = yield discoverLink.discoverResources(queueItem);
            const allowUrls = [];
            // url地址queue化
            urls.forEach((url) => {
                const q = queue.queueURL(url, queueItem || {});
                if (q) {
                    allowUrls.push(q);
                }
            });
            this.$logger.debug("getAllowsUrls", urls, allowUrls);
            return allowUrls;
        });
    }
};
Linker = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("log")), __param(0, inversify_1.tagged("color", true)),
    __metadata("design:paramtypes", [Object])
], Linker);
exports.Linker = Linker;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/link/index.js.map