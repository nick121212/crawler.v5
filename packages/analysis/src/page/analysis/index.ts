import _ from "lodash";
import { multiInject } from "inversify";

import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";

export { AreaStrategy } from "./area";
export { ArrayStrategy } from "./array";
export { CaseStrategy } from "./case";
export { NormalStrategy } from "./normal";
export { ObjectStrategy } from "./object";
export { OrStrategy } from "./or";
export { SwitchStrategy } from "./switch";
export { BaseAnalysis } from "./base";

/**
 * 处理html文本策越
 */
export class AnalysisStrategy extends BaseAnalysis {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor(@multiInject(BaseAnalysis) analysises: BaseAnalysis[]) {
        super();

        analysises.forEach((ayalysis: BaseAnalysis) => {
            if (ayalysis.ayalysisName) {
                this.deals[ayalysis.ayalysisName] = ayalysis;
                ayalysis.deals = this.deals;
            }
        });
    }

    /**
     * 开始处理文本
     * @param   {IQueueItem}  queueItem 数据
     * @param   {Object}      rule      配置
     * @returns {Promise}
     */
    public async doDeal(queueItem: IQueueItem, rule: any): Promise<any> {
        let promiseAll: any = [];
        let dataResults = {};
        let check = (results: any) => {
            let promises: any = [];
            let getPromises = (rts: any) => {
                _.forEach(rts, (result: any) => {
                    if (_.isArray(result)) {
                        getPromises(result);
                    } else if (result && result.data && result.data.data) {
                        promises = promises.concat(this.doDealData.call(this, queueItem, result.data.data, result.result, result.$cur, result.index));
                    }
                });
            };
            getPromises(results);

            return promises.length ? Promise.all(promises).then(check.bind(this)) : {
                result: dataResults,
                rule: rule.key
            };
            // return promises.length ? Promise.all(promises).then(check) : dataResults;
        };

        // 处理area
        return await this.deals.area.doDeal(queueItem, rule.areas).then((results: any) => {
            _.forEach(rule.fields, (field: any, key: string) => {
                promiseAll = promiseAll.concat(this.doDealData.call(this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
            });

            return Promise.all(promiseAll).then(check.bind(this));
        });
    }
}
