import * as _ from "lodash";
import { Base } from "./base";
import jsdom from "../html/jsdom";
export class Strategy extends Base {
    /**
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * 这里会选择一个匹配的元素，并获取值，用于case的匹配
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        return jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let promises = [];
            for (let i = 0; i < res.len; i++) {
                promises = promises.concat(this.doDealData(queueItem, data.data.concat([]), results, res.$cur, i));
            }
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults = [];
                    _.each(cases, (casee) => {
                        if (casee) {
                            _.each(casee.data.data, (d) => {
                                d.dataIndex = res.index;
                            });
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return res;
        });
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/switch.js.map