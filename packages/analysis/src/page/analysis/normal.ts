import _ from "lodash";
import jpp from "json-pointer";

import { Base } from "./base";
import jsdom from "../html/jsdom";

export class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();
    }

    /**
     * 解析普通的元素数据
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    public doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any> {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let jData = jpp(results);
            let path: Array<string> = [];
            let idx = _.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;

            if (typeof idx === "number" && _.isArray(results)) {
                path.push(idx.toString());
            }
            if (data.key) {
                path.push(data.key);
            }

            if (res.result) {
                jData.set(jpp.compile(path), this.doFormatData(res.result, data.formats));
            }

            return res;
        });

        return promise;
    }
}

export default new Strategy();
