import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";
export declare class ArrayStrategy extends BaseAnalysis {
    ayalysisName: string;
    /**
     * 解析数组的元素数据
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */
    doDeal(queueItem: IQueueItem, data: any, results: any, $: any, index: number): Promise<any>;
}
