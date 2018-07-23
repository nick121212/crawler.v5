import _ from "lodash";
import jpp from "json-pointer";
import { Base } from "./base";
import jsdom from "../html/jsdom";
export class Strategy extends Base {
    /**
     * 解析数组的元素数据
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let jData = jpp(results);
        let path = [];
        let idx = _.isUndefined(data.dataIndex) ? index : data.dataIndex;
        let resource;
        if (_.isNumber(idx) && _.isArray(results)) {
            path.push(idx.toString());
        }
        if (data.key) {
            path.push(data.key);
        }
        if (!jData.has(jpp.compile(path))) {
            jData.set(jpp.compile(path), []);
        }
        results = jData.get(jpp.compile(path));
        return jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let promises = [];
            res.result = results;
            for (let i = 0, n = res.len; i < n; i++) {
                res.result.push({});
                promises = promises.concat(this.doDealData(queueItem, data.data ? data.data.concat([]) : [], res.result, res.$cur, i));
            }
            resource = res;
            return promises;
        }).then((promises) => {
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults = [];
                    _.each(cases, (casee) => {
                        if (casee) {
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return resource;
        });
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/array.js.map