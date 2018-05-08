import qs from "qs";
import jpp from "json-pointer";
import _ from "lodash";

/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 处理数据，获取querystring中键值
     * @returns {String}
     */
    public doDeal(result: string, data: { pointer: string }): any {
        if (!_.isString(result)) {
            return null;
        }

        let query = result;

        if (result.indexOf("?") >= 0) {
            query = query.substr(query.indexOf("?") + 1);
        }
        if (result.indexOf("#") >= 0) {
            query = query.substr(query.indexOf("#") + 1);
        }

        let noSparse = qs.parse(result);

        return jpp(noSparse).get(data.pointer || "");
    }
}

export default new Strategy();
