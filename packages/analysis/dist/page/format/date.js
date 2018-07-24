"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const moment_1 = require("moment");
/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * 转换成日期类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result, settings) {
        let res = moment_1.default(lodash_1.default.trim(result), settings.format || "YYYY-MM-DD");
        if (res.isValid()) {
            return res.format(settings.format || "YYYY-MM-DD");
        }
        return "1990-01-01";
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/date.js.map