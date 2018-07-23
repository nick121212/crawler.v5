export declare class JsDomDealStrategy {
    /**
     * 处理一个字段
     * @param queueItem 爬取的数据
     * @param data      单个数据配置
     * @param $         dom节点
     * @param index     数组中，节点的索引
     */
    doDeal(queueItem: any, data: any, $?: any, index?: number): Promise<any>;
    /**
    * 获取dom元素
    * @param queueItem 抓取数据详情
    * @param $ jquery对象
    */
    private load;
    /**
     * 删除选择器的元素
     * @param $sel       当前dom元素
     * @param selector   选择器
     */
    private doRemoveEle;
    /**
     * 取得元素节点
     * @param $        dom元素
     * @param selector 选择器
     * @return cheerio对象
     */
    private doFindSelector;
    /**
     * 调用方法
     * @param $           dom元素
     * @param methodInfo  调用的方法名称
     * @returns {*}
     */
    private doCallMethod;
}
declare const _default: JsDomDealStrategy;
export default _default;
