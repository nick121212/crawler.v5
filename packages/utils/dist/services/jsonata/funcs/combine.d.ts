import jsonata from "jsonata";
import { IFunc } from "./func";
export declare class CombineFunc implements IFunc {
    init(exp: jsonata.Expression): void;
    private combine;
}
