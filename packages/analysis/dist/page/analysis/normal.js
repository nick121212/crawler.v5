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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const json_pointer_1 = require("json-pointer");
const inversify_1 = require("inversify");
const base_1 = require("./base");
const jsdom_1 = require("../html/jsdom");
let NormalStrategy = class NormalStrategy extends base_1.BaseAnalysis {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();
        this.ayalysisName = "normal";
    }
    /**
     * 解析普通的元素数据
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
            if (data.key) {
                path.push(data.key);
            }
            if (res.result) {
                jData.set(json_pointer_1.default.compile(path), this.doFormatData(res.result, data.formats));
            }
            return res;
        });
        return promise;
    }
};
NormalStrategy = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], NormalStrategy);
exports.NormalStrategy = NormalStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/normal.js.map