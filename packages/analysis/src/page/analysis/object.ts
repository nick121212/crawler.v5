import _ from "lodash";
import jpp from "json-pointer";
import { injectable } from "inversify";

import { BaseAnalysis } from "./base";
import jsdom from "../html/jsdom";
import { IQueueItem } from "../../models/queueitem";

@injectable()

export class ObjectStrategy extends BaseAnalysis {
    public ayalysisName = "object";
    /**
     * 解析对象的数据
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    public doDeal(queueItem: IQueueItem, data: any, results: any, $: any, index: number): Promise<any> {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let jData = jpp(results);
            let path: Array<string> = [];
            let idx = _.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;

            if (typeof idx === "number" && _.isArray(results)) {
                path.push(idx.toString());
            }

            if (path) {
                results = jData.get(jpp.compile(path));
            }
            results[data.key] = {};
            res.result = results[data.key];

            if (path) {
                res.index = null;
            }

            return res;
        });

        return promise;
    }
}
