import _ from "lodash";
import { injectable } from "inversify";

import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";

@injectable()

export class OrStrategy extends BaseAnalysis {
    public ayalysisName = "or";
    /**
     * 有些数据会出现在多个地方，一个地方匹配则返回
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    public doDeal(queueItem: IQueueItem, data: any, results: any, $: any, index: number): Promise<any> {
        if (data.key) {
            _.each(data.data, (d: any) => {
                d.key = data.key;
            });
        }

        let promises = this.doDealData(queueItem, data.data.concat([]), results, $, index);

        return Promise.all(promises).then((cases) => {
            let rtnResults: Array<any> = [];

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
