/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 返回字符串
     * @param   {any}    reseult
     * @returns {String}
     */
    doDeal(result) {
        if (result === null || result === undefined) {
            return "";
        }
        return result.toString();
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/str.js.map