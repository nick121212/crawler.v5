"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const json_pointer_1 = require("json-pointer");
const lodash_1 = require("lodash");
/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * 处理数据，获取querystring中键值
     * @returns {String}
     */
    doDeal(result, data) {
        if (!lodash_1.default.isString(result)) {
            return null;
        }
        let query = result;
        if (result.indexOf("?") >= 0) {
            query = query.substr(query.indexOf("?") + 1);
        }
        if (result.indexOf("#") >= 0) {
            query = query.substr(query.indexOf("#") + 1);
        }
        let noSparse = qs_1.default.parse(result);
        return json_pointer_1.default(noSparse).get(data.pointer || "");
    }
}
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/qs.js.map