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
const base_1 = require("./base");
let OrStrategy = class OrStrategy extends base_1.BaseAnalysis {
    constructor() {
        super(...arguments);
        this.ayalysisName = "or";
    }
    /**
     * 有些数据会出现在多个地方，一个地方匹配则返回
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    doDeal(queueItem, data, results, $, index) {
        if (data.key) {
            lodash_1.default.each(data.data, (d) => {
                d.key = data.key;
            });
        }
        let promises = this.doDealData(queueItem, data.data.concat([]), results, $, index);
        return Promise.all(promises).then((cases) => {
            let rtnResults = [];
            lodash_1.default.each(cases, (casee) => {
                if (casee.result) {
                    rtnResults.push(casee);
                    return false;
                }
                return true;
            });
        });
    }
};
OrStrategy = __decorate([
    inversify_1.injectable()
], OrStrategy);
exports.OrStrategy = OrStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/or.js.map