"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * string值处理
 */
class Strategy {
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param   {String}  result       dom节点的值
     * @param   { lr:boolean, m:boolean }       settings
     * @returns {String}
     */
    doDeal(result, settings) {
        if (lodash_1.default.isString(result)) {
            if (settings.lr === false) {
                result = lodash_1.default.trim(result);
            }
            if (settings.m === false) {
                result = result.replace(/<\/?.+?>/g, "");
                result = result.replace(/[\r\n]/g, "");
            }
        }
        return result;
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/trim.js.map