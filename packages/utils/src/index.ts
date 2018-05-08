import { Warrior, Logs } from "./interfaces";
import { utilsContainer } from "./inversify.config";
import { TYPES } from "./types";

const ninja: Warrior = utilsContainer.get<Warrior>(TYPES.Warrior);
const logInfo: Logs = utilsContainer.get<Logs>(TYPES.Logs);

console.log("123--456d7", ninja.fight(), ninja.sneak());

logInfo.info("test");
