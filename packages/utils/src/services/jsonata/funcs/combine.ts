import { injectable } from "inversify";
import jsonata from "jsonata";

import { IFunc } from "./func";

@injectable()
export class CombineFunc implements IFunc {

    public init(exp: jsonata.Expression) {
        exp.assign("combine", this.combine);
    }

    private combine(objs: Array<Object>) {
        if (objs.constructor !== Array) {
            throw new Error("第一个参数有问题");
        }

        return objs.reduce((prev: Object, obj: Object) => {
            return Object.assign({}, prev, obj);
        }, {});
    }
}
