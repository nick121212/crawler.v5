"use strict";
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
const jsdom_1 = require("jsdom");
const jquery_js_1 = require("jquery/dist/jquery.js");
// const jq = require("raw-loader!jquery/dist/jquery.js");
// console.log(jq);
class JsDomDealStrategy {
    /**
     * 处理一个字段
     * @param queueItem 爬取的数据
     * @param data      单个数据配置
     * @param $         dom节点
     * @param index     数组中，节点的索引
     */
    doDeal(queueItem, data, $, index) {
        let $sel, result, len = 0;
        let $noSelcSel;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // 载入当前的cheerio根节点
            $ = yield this.load(queueItem, $);
            // 如果存在index，则获取索引节点
            if (typeof index === "number" && $.length > index) {
                $sel = $.eq(index);
            }
            try {
                $noSelcSel = $sel || $;
                // 查找当前的dom
                $sel = this.doFindSelector($noSelcSel, data.selector);
                len = $sel ? $sel.length : 0;
                if (len && data.methodInfo) {
                    $sel = this.doRemoveEle($sel, data.removeSelector);
                    result = this.doCallMethod($sel, data.methodInfo);
                }
                resolve({
                    result: result,
                    data: lodash_1.default.cloneDeep(data),
                    $cur: $sel,
                    $noSelcSel: $noSelcSel,
                    $parent: $,
                    len: len,
                    index: index
                });
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    /**
    * 获取dom元素
    * @param queueItem 抓取数据详情
    * @param $ jquery对象
    */
    load(queueItem, $) {
        return new Promise((resolve, reject) => {
            if ($) {
                return resolve($);
            }
            jsdom_1.default.env({
                html: queueItem.responseBody.replace(/iframe/g, "iframe1"),
                parsingMode: "html",
                src: [jquery_js_1.default],
                done: function (err, window) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(window.$("body"));
                }
            });
        });
    }
    /**
     * 删除选择器的元素
     * @param $sel       当前dom元素
     * @param selector   选择器
     */
    doRemoveEle($sel, selector) {
        if (!lodash_1.default.isArray(selector)) {
            selector = [selector];
        }
        lodash_1.default.each(selector, (sel) => {
            try {
                $sel.find(sel).remove();
            }
            catch (e) {
                console.log(e.message);
            }
        });
        return $sel;
    }
    /**
     * 取得元素节点
     * @param $        dom元素
     * @param selector 选择器
     * @return cheerio对象
     */
    doFindSelector($, selector) {
        let $sel = $;
        if (!selector) {
            selector = [];
        }
        if (!lodash_1.default.isArray(selector) && typeof selector === "string") {
            selector = [selector];
        }
        if (!lodash_1.default.isArray(selector)) {
            return $sel;
        }
        lodash_1.default.each(selector, (sel) => {
            switch (typeof sel) {
                case "string":
                    $sel = $sel.find(sel);
                    break;
                case "object":
                    $sel = this.doCallMethod($sel, sel);
                    break;
            }
            if (!$sel.length) {
                return false;
            }
            return true;
        });
        return $sel;
    }
    /**
     * 调用方法
     * @param $           dom元素
     * @param methodInfo  调用的方法名称
     * @returns {*}
     */
    doCallMethod($, methodInfo) {
        let $sel = null;
        lodash_1.default.forEach(methodInfo, (params, method) => {
            if (params && !lodash_1.default.isArray(params)) {
                params = [params];
            }
            $sel = $[method].apply($, params || []);
        });
        return $sel;
    }
}
exports.JsDomDealStrategy = JsDomDealStrategy;
exports.default = new JsDomDealStrategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/html/jsdom.js.map