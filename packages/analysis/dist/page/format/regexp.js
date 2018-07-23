const replaceRegexp = (str) => {
    str = str || "";
    str = str.toString();
    return str.replace(/(^\/)|(\/$)/g, "");
};
/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 正则匹配数据
     * @returns {String}
     */
    doDeal(result, data) {
        let regexp = new RegExp(replaceRegexp(data.regexp), data.scope || "i");
        let matchs = result.match(regexp);
        let index = data.index || 0;
        if (matchs && matchs.length > index) {
            result = matchs[index];
        }
        else {
            result = "";
        }
        return result;
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/regexp.js.map