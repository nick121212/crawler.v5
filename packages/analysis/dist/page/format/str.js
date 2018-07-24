"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * 返回字符串
     * @param   {any}    reseult
     * @returns {String}
     */
    doDeal(result) {
        if (result === null || result === undefined) {
            return "";
        }
        return result.toString();
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/str.js.map