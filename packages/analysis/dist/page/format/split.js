import _ from "lodash";
export class Strategy {
    /**
     * 使用split来处理字符串
     * @returns {String}
     */
    doDeal(result, settings) {
        let datas = result.split(settings.splitOf || " ");
        datas = _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length);
        if (settings.join) {
            return _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length).join(settings.join);
        }
        return datas;
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/split.js.map