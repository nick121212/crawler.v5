import jsonata from "jsonata";
export interface IFunc {
    init(exp: jsonata.Expression): void;
}
