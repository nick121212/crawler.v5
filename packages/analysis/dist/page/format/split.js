"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Strategy {
    /**
     * 使用split来处理字符串
     * @returns {String}
     */
    doDeal(result, settings) {
        let datas = result.split(settings.splitOf || " ");
        datas = lodash_1.default.slice(datas, ~~settings.start, lodash_1.default.isNumber(settings.end) ? settings.end : datas.length);
        if (settings.join) {
            return lodash_1.default.slice(datas, ~~settings.start, lodash_1.default.isNumber(settings.end) ? settings.end : datas.length).join(settings.join);
        }
        return datas;
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/split.js.map