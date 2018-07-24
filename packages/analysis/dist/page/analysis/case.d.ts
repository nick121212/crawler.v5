import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";
export declare class CaseStrategy extends BaseAnalysis {
    ayalysisName: string;
    /**
     * case模式，必须配合switch来使用
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem: IQueueItem, data: any, results: any, $: any, index: number): Promise<any>;
}
