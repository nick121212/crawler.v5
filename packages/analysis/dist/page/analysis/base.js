"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const format_1 = require("../format");
let BaseAnalysis = class BaseAnalysis {
    constructor() {
        this.ayalysisName = "";
        this.deals = {};
    }
    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    doDealData(queueItem, data, results, $, index) {
        let promises = [];
        let strategy;
        data = data.concat([]);
        lodash_1.default.each(data, (d) => {
            strategy = this.deals[d.dealStrategy] || this.deals.normal;
            if (!strategy) {
                throw new Error(`没有找到${d.dealStrategy}的分析器！`);
            }
            else {
                promises.push(strategy.doDeal(queueItem, d, results, $, index));
            }
        });
        return promises;
    }
    /**
     * 数据的格式化函数
     * @param  {String}        result  返回的数据
     * @param  {Array<Object>} formats 需要处理的方法集
     * @return {String|Number} 返回数据
     */
    doFormatData(result, formats) {
        let res = result;
        lodash_1.default.each(formats, (format) => {
            res = format_1.default.doDeal(format.key, res, format.settings);
        });
        return res;
    }
};
BaseAnalysis = __decorate([
    inversify_1.injectable()
], BaseAnalysis);
exports.BaseAnalysis = BaseAnalysis;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/base.js.map