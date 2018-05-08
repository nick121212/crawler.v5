import _ from "lodash";

export class Strategy {
    /**
     * 使用split来处理字符串
     * @returns {String}
     */
    public doDeal(result: string, settings: { splitOf: string, start: number, end: number, join: string }): Array<any> | string {
        let datas: Array<any> = result.split(settings.splitOf || " ");

        datas = _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length);
        if (settings.join) {
            return _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length).join(settings.join);
        }

        return datas;
    }
}

export default new Strategy();
