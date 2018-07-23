var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "lodash";
import { Base } from "./base";
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
        _.forEach(this.deals, (deal) => {
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
    doDeal(queueItem, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseAll = [];
            let dataResults = {};
            let check = (results) => {
                let promises = [];
                let getPromises = (rts) => {
                    _.forEach(rts, (result) => {
                        if (_.isArray(result)) {
                            getPromises(result);
                        }
                        else if (result && result.data && result.data.data) {
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
            return yield this.deals.area.doDeal(queueItem, rule.areas).then((results) => {
                _.forEach(rule.fields, (field, key) => {
                    promiseAll = promiseAll.concat(this.doDealData.call(this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
                });
                return Promise.all(promiseAll).then(check.bind(this));
            });
        });
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/index.js.map