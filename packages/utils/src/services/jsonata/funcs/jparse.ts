import { injectable } from "inversify";
import jsonata from "jsonata";

import { IFunc } from "./func";

@injectable()
export class JparseFunc implements IFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("jparse", this.combine);
    }

    private combine(objs: string) {
        if (objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }

        return JSON.parse(objs);
    }
}
