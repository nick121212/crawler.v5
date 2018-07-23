import { injectable } from "inversify";
import jsonata from "jsonata";
import qs from "qs";

import { IFunc } from "./func";

@injectable()
export class QsFunc implements IFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("qs", this.urlparse);
    }

    private urlparse(objs: string, key?: string) {
        if (!objs || objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }

        const noSparse = qs.parse(objs);

        if (key) {
            return noSparse[key];
        }

        return noSparse;
    }
}
