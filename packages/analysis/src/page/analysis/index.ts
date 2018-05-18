import _ from "lodash";
import { Base } from "./base";
import { IQueueItem } from "../../models/queueitem";

import area from "./area";
import array from "./array";
import case1 from "./case";
import normal from "./normal";
import object from "./object";
import or1 from "./or";
import switch1 from "./switch";

/**
 * 处理html文本策越
 */
export class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();

        this.deals.area = area;
        this.deals.array = array;
        this.deals.case = case1;
        this.deals.normal = normal;
        this.deals.object = object;
        this.deals.or = or1;
        this.deals.switch = switch1;

        _.forEach(this.deals, (deal: any) => {
            if (deal) {
                deal.deals = this.deals;
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

export default new Strategy();
