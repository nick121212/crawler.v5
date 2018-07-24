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
const path_to_regexp_1 = require("path-to-regexp");
const inversify_1 = require("inversify");
const analysis_1 = require("./analysis");
let HtmlPager = class HtmlPager {
    /**
     * 构造函数
     * @param  {AnalysisStrategy} analysis 分析代码用类
     */
    constructor(analysis) {
        this.analysis = analysis;
    }
    /**
     * 解析html获取json数据
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {Array<any>}       pages           页面的配置
     * @returns {Promise<any[]>}
     */
    htmlToJson(queueItem, pages) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!queueItem) {
                return [];
            }
            const results = [], rules = lodash_1.default.filter(pages, ({ path }) => {
                const pathToReg = path_to_regexp_1.default(path.toString(), []);
                return pathToReg.test(queueItem.path || "");
            });
            // 解析规则，分析页面中的字段
            if (rules.length && queueItem.responseBody) {
                for (const rule of rules) {
                    results.push(yield this.analysis.doDeal(queueItem, rule));
                }
            }
            return results;
        });
    }
};
HtmlPager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(analysis_1.AnalysisStrategy)),
    __metadata("design:paramtypes", [analysis_1.AnalysisStrategy])
], HtmlPager);
exports.HtmlPager = HtmlPager;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/index.js.map