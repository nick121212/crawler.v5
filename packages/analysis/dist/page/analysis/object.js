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
let ObjectStrategy = class ObjectStrategy extends base_1.BaseAnalysis {
    constructor() {
        super(...arguments);
        this.ayalysisName = "object";
    }
    /**
     * 解析对象的数据
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    doDeal(queueItem, data, results, $, index) {
        let promise = jsdom_1.default.doDeal(queueItem, data, $, index).then((res) => {
            let jData = json_pointer_1.default(results);
            let path = [];
            let idx = lodash_1.default.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;
            if (typeof idx === "number" && lodash_1.default.isArray(results)) {
                path.push(idx.toString());
            }
            if (path) {
                results = jData.get(json_pointer_1.default.compile(path));
            }
            results[data.key] = {};
            res.result = results[data.key];
            if (path) {
                res.index = null;
            }
            return res;
        });
        return promise;
    }
};
ObjectStrategy = __decorate([
    inversify_1.injectable()
], ObjectStrategy);
exports.ObjectStrategy = ObjectStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/object.js.map