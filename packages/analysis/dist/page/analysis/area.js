import _ from "lodash";
import jsdom from "../html/jsdom";
export class Strategy {
    /**
     * jQuery中可以获取一个元素，并进行缓存，加快之后的解析速度
     * @param   {Object}   queueItem queueitem
     * @param   {Object}   areas     区域
     * @returns {Promise}
     */
    doDeal(queueItem, areas) {
        let promises = [];
        // 遍历
        _.each(areas, (area) => {
            promises.push(jsdom.doDeal(queueItem, area));
        });
        // 执行
        return Promise.all(promises).then((results) => {
            return _.keyBy(results, (res) => {
                if (res && res.data) {
                    return res.data.key;
                }
                return Date.now();
            });
        });
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/area.js.map