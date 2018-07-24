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
export declare class AnalysisStrategy extends BaseAnalysis {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor(analysises: BaseAnalysis[]);
    /**
     * 开始处理文本
     * @param   {IQueueItem}  queueItem 数据
     * @param   {Object}      rule      配置
     * @returns {Promise}
     */
    doDeal(queueItem: IQueueItem, rule: any): Promise<any>;
}
