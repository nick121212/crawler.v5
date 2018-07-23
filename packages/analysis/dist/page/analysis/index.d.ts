import { Base } from "./base";
import { IQueueItem } from "../../models/queueitem";
/**
 * 处理html文本策越
 */
export declare class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor();
    /**
     * 开始处理文本
     * @param   {IQueueItem}  queueItem 数据
     * @param   {Object}      rule      配置
     * @returns {Promise}
     */
    doDeal(queueItem: IQueueItem, rule: any): Promise<any>;
}
declare const _default: Strategy;
export default _default;
