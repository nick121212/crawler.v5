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
const jsdom_1 = require("../html/jsdom");
let SwitchStrategy = class SwitchStrategy extends base_1.BaseAnalysis {
    constructor() {
        super(...arguments);
        this.ayalysisName = "switch";
    }
    /**
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * 这里会选择一个匹配的元素，并获取值，用于case的匹配
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        return jsdom_1.default.doDeal(queueItem, data, $, index).then((res) => {
            let promises = [];
            for (let i = 0; i < res.len; i++) {
                promises = promises.concat(this.doDealData(queueItem, data.data.concat([]), results, res.$cur, i));
            }
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults = [];
                    lodash_1.default.each(cases, (casee) => {
                        if (casee) {
                            lodash_1.default.each(casee.data.data, (d) => {
                                d.dataIndex = res.index;
                            });
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return res;
        });
    }
};
SwitchStrategy = __decorate([
    inversify_1.injectable()
], SwitchStrategy);
exports.SwitchStrategy = SwitchStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/switch.js.map