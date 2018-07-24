"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result, settings) {
        let res = result;
        try {
            if (settings.parse) {
                res = JSON.parse(res);
            }
            if (lodash_1.default.isFunction(settings.func)) {
                res = settings.func.call(this, res);
            }
        }
        catch (e) {
            return {};
        }
        return res;
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/json.js.map