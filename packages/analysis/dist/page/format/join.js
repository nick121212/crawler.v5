"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * null转换"""
     * @param {any}             reseult
     * @param { join: string }  $1
     * @returns {String}
     */
    doDeal(result, { join }) {
        try {
            return result.join(join || ",");
        }
        catch (e) {
            // return result;
        }
        return result;
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/join.js.map