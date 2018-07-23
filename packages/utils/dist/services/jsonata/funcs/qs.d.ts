import jsonata from "jsonata";
import { IFunc } from "./func";
export declare class QsFunc implements IFunc {
    init(exp: jsonata.Expression): void;
    private urlparse;
}
