import { Container } from "inversify";
import { TYPES } from "./types";
import { Warrior, Weapon, ThrowableWeapon, Logs } from "./interfaces";
import { Ninja, Katana, Shuriken } from "./entities";
import { ColorLogs } from "./logs";

const utilsContainer = new Container();

utilsContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
utilsContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
utilsContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
utilsContainer.bind<Logs>(TYPES.Logs).to(ColorLogs).inSingletonScope();

export { utilsContainer };