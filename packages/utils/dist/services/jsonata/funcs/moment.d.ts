import jsonata from "jsonata";
import { IFunc } from "./func";
export declare class MomentFunc implements IFunc {
    init(exp: jsonata.Expression): void;
    private moment;
}
