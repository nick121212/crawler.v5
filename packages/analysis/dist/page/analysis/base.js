import _ from "lodash";
import dataDeal from "../format";
export class Base {
    constructor() {
        this.deals = {};
    }
    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    doDealData(queueItem, data, results, $, index) {
        let promises = [];
        let strategy;
        data = data.concat([]);
        _.each(data, (d) => {
            strategy = this.deals[d.dealStrategy] || this.deals.normal;
            if (!strategy) {
                throw new Error(`没有找到${d.dealStrategy}的分析器！`);
            }
            else {
                promises.push(strategy.doDeal(queueItem, d, results, $, index));
            }
        });
        return promises;
    }
    /**
     * 数据的格式化函数
     * @param  {String}        result
     * @param  {Array<Object>} formats
     * @return {String|Number} 返回数据
     */
    doFormatData(result, formats) {
        let res = result;
        _.each(formats, (format) => {
            res = dataDeal.doDeal(format.key, res, format.settings);
        });
        return res;
    }
}
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/base.js.map