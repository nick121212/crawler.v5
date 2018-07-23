import { injectable } from "inversify";
import jsonata from "jsonata";
import moment from "moment";

import { IFunc } from "./func";

@injectable()
export class MomentFunc implements IFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("moment", this.moment);
    }

    private moment(...args: Array<any>) {
        return moment.apply(this, args);
    }
}
