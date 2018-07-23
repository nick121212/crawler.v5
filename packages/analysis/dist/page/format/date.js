import _ from "lodash";
import moment from "moment";
/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 转换成日期类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result, settings) {
        let res = moment(_.trim(result), settings.format || "YYYY-MM-DD");
        if (res.isValid()) {
            return res.format(settings.format || "YYYY-MM-DD");
        }
        return "1990-01-01";
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/date.js.map