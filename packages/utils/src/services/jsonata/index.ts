import * as jsonata from "jsonata";
import { injectable, multiInject } from "inversify";
import { IFunc } from "./funcs/func";

export { CombineFunc } from "./funcs/combine";
export { JparseFunc } from "./funcs/jparse";
export { MomentFunc } from "./funcs/moment";
export { QsFunc } from "./funcs/qs";
export { IFunc } from "./funcs/func";

// console.log(object)

@injectable()
export class Jsonata {

    constructor(@multiInject("func") private funcs: IFunc[]) {}

    public exp(str: string) {
        const exp: jsonata.Expression = jsonata(str);

        this.funcs.forEach((func: IFunc) => {
            func.init(exp);
        });

        return exp;
    }
}
