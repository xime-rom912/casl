import { AbilityBuilder, Ability } from "@casl/ability";
import { permisionsAdmin, permissionsUser } from "./roles";

const USER_ROLES ={
    ADMIN: 1,
    BASIC_USER: 2
}

const DEFAULT_ABILITIES = new Ability();

export function RoleAbilityUser({}){

}