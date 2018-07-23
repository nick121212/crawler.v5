export class FormatStrategy {
    constructor() {
        this.formats = {};
        // _.each(requireDir(module, "./"), (format: any, key: string) => {
        //     this.formats[key] = format.default;
        // });
    }
    /**
     * 开始处理文本
     * @param result      {Any}    数据
     * @param config      {Object} 配置
     * @returns Any
     */
    doDeal(key, result, settings = {}) {
        let strategy = this.formats[key];
        if (!strategy) {
            return result;
        }
        try {
            return strategy.doDeal(result, settings);
        }
        catch (e) {
            return result;
        }
    }
}
export default new FormatStrategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/index.js.map