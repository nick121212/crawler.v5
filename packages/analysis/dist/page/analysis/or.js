import _ from "lodash";
import { Base } from "./base";
export class Strategy extends Base {
    /**
     * 有些数据会出现在多个地方，一个地方匹配则返回
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    doDeal(queueItem, data, results, $, index) {
        if (data.key) {
            _.each(data.data, (d) => {
                d.key = data.key;
            });
        }
        let promises = this.doDealData(queueItem, data.data.concat([]), results, $, index);
        return Promise.all(promises).then((cases) => {
            let rtnResults = [];
            _.each(cases, (casee) => {
                if (casee.result) {
                    rtnResults.push(casee);
                    return false;
                }
                return true;
            });
        });
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/or.js.map