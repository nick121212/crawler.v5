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
const jsdom_1 = require("../html/jsdom");
const base_1 = require("./base");
let AreaStrategy = class AreaStrategy extends base_1.BaseAnalysis {
    /**
     * jQuery中可以获取一个元素，并进行缓存，加快之后的解析速度
     * @param   {Object}   queueItem queueitem
     * @param   {Object}   areas     区域
     * @returns {Promise}
     */
    doDeal(queueItem, areas) {
        let promises = [];
        // 遍历
        lodash_1.default.each(areas, (area) => {
            promises.push(jsdom_1.default.doDeal(queueItem, area));
        });
        // 执行
        return Promise.all(promises).then((results) => {
            return lodash_1.default.keyBy(results, (res) => {
                if (res && res.data) {
                    return res.data.key;
                }
                return Date.now();
            });
        });
    }
};
AreaStrategy = __decorate([
    inversify_1.injectable()
], AreaStrategy);
exports.AreaStrategy = AreaStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/area.js.map