"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const base_1 = require("./base");
const jsdom_1 = require("../html/jsdom");
let CaseStrategy = class CaseStrategy extends base_1.BaseAnalysis {
    constructor() {
        super(...arguments);
        this.ayalysisName = "case";
    }
    /**
     * case模式，必须配合switch来使用
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let promise = jsdom_1.default.doDeal(queueItem, data, $, index).then((res) => {
            if (!res.result || res.result.indexOf(res.data.match) < 0) {
                res = null;
            }
            else {
                res.result = results;
                res.$cur = res.$parent;
            }
            return res;
        });
        return promise;
    }
};
CaseStrategy = __decorate([
    inversify_1.injectable()
], CaseStrategy);
exports.CaseStrategy = CaseStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/case.js.map