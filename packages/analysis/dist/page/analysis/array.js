"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const json_pointer_1 = require("json-pointer");
const inversify_1 = require("inversify");
const base_1 = require("./base");
const jsdom_1 = require("../html/jsdom");
let ArrayStrategy = class ArrayStrategy extends base_1.BaseAnalysis {
    constructor() {
        super(...arguments);
        this.ayalysisName = "array";
    }
    /**
     * 解析数组的元素数据
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let jData = json_pointer_1.default(results);
        let path = [];
        let idx = lodash_1.default.isUndefined(data.dataIndex) ? index : data.dataIndex;
        let resource;
        if (lodash_1.default.isNumber(idx) && lodash_1.default.isArray(results)) {
            path.push(idx.toString());
        }
        if (data.key) {
            path.push(data.key);
        }
        if (!jData.has(json_pointer_1.default.compile(path))) {
            jData.set(json_pointer_1.default.compile(path), []);
        }
        results = jData.get(json_pointer_1.default.compile(path));
        return jsdom_1.default.doDeal(queueItem, data, $, index).then((res) => {
            let promises = [];
            res.result = results;
            for (let i = 0, n = res.len; i < n; i++) {
                res.result.push({});
                promises = promises.concat(this.doDealData(queueItem, data.data ? data.data.concat([]) : [], res.result, res.$cur, i));
            }
            resource = res;
            return promises;
        }).then((promises) => {
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults = [];
                    lodash_1.default.each(cases, (casee) => {
                        if (casee) {
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return resource;
        });
    }
};
ArrayStrategy = __decorate([
    inversify_1.injectable()
], ArrayStrategy);
exports.ArrayStrategy = ArrayStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/array.js.map