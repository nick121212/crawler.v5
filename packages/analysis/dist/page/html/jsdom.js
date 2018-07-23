var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "lodash";
import jsdom from "jsdom";
import jq from "jquery/dist/jquery.js";
// const jq = require("raw-loader!jquery/dist/jquery.js");
// console.log(jq);
export class JsDomDealStrategy {
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
                    data: _.cloneDeep(data),
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
            jsdom.env({
                html: queueItem.responseBody.replace(/iframe/g, "iframe1"),
                parsingMode: "html",
                src: [jq],
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
        if (!_.isArray(selector)) {
            selector = [selector];
        }
        _.each(selector, (sel) => {
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
        if (!_.isArray(selector) && typeof selector === "string") {
            selector = [selector];
        }
        if (!_.isArray(selector)) {
            return $sel;
        }
        _.each(selector, (sel) => {
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
        _.forEach(methodInfo, (params, method) => {
            if (params && !_.isArray(params)) {
                params = [params];
            }
            $sel = $[method].apply($, params || []);
        });
        return $sel;
    }
}
export default new JsDomDealStrategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/html/jsdom.js.map