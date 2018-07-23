import * as jsonata from "jsonata";
import { IFunc } from "./funcs/func";
export { CombineFunc } from "./funcs/combine";
export { JparseFunc } from "./funcs/jparse";
export { MomentFunc } from "./funcs/moment";
export { QsFunc } from "./funcs/qs";
export { IFunc } from "./funcs/func";
export declare class Jsonata {
    private funcs;
    constructor(funcs: IFunc[]);
    exp(str: string): jsonata.Expression;
}
