import _ from "lodash";
import { injectable } from "inversify";

import jsdom from "../html/jsdom";
import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";

@injectable()
export class AreaStrategy extends BaseAnalysis {
    /**
     * jQuery中可以获取一个元素，并进行缓存，加快之后的解析速度
     * @param   {Object}   queueItem queueitem
     * @param   {Object}   areas     区域
     * @returns {Promise}
     */
    public doDeal(queueItem: IQueueItem, areas: Array<any>): Promise<any> {
        let promises: Array<any> = [];

        // 遍历
        _.each(areas, (area: any) => {
            promises.push(jsdom.doDeal(queueItem, area));
        });

        // 执行
        return Promise.all(promises).then((results: any) => {
            return _.keyBy(results, (res) => {
                if (res && res.data) {
                    return res.data.key;
                }

                return Date.now();
            });
        });
    }
}
