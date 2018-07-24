import { IQueueItem } from "../../models/queueitem";
export declare class BaseAnalysis {
    ayalysisName: string;
    deals: any;
    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    doDealData(queueItem: IQueueItem, data: any, results: any, $: any, index: number): Array<Promise<any>>;
    /**
     * 数据的格式化函数
     * @param  {String}        result  返回的数据
     * @param  {Array<Object>} formats 需要处理的方法集
     * @return {String|Number} 返回数据
     */
    doFormatData(result: any, formats: Array<{
        key: string;
        settings: Object;
    }>): any;
}
