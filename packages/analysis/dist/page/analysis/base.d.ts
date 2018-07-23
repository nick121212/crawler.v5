export declare class Base {
    protected deals: any;
    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    doDealData(queueItem: any, data: any, results: any, $: any, index: number): Array<Promise<any>>;
    /**
     * 数据的格式化函数
     * @param  {String}        result
     * @param  {Array<Object>} formats
     * @return {String|Number} 返回数据
     */
    doFormatData(result: any, formats: Array<{
        key: string;
        settings: Object;
    }>): any;
}
