import { AbilityBuilder, Ability } from "@casl/ability";

export const Permissions = {
    READ: "read",
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete"
};

export const MODEL_NAMES = {
    MOVIES: "movies"
};

export function permisionsAdmin(){
    const {rules, can} = AbilityBuilder.extract()
    can(Permissions,MODEL_NAMES.MOVIES);

    return new Ability(rules);
}

export function permisionsUser(){
    const {rules, can} = AbilityBuilder.extract()
    can(Permissions,MODEL_NAMES.MOVIES);
    cannot(Permissions.CREATE,MODEL_NAMES.MOVIES).because("Solo los administradores pueden crear peliculas");
    cannot(Permissions.UPDATE,MODEL_NAMES.MOVIES).because("Solo los administradores pueden acutualizar peliculas");
    cannot(Permissions.DELETE,MODEL_NAMES.MOVIES).because("Solo los administradores pueden eliminar peliculas");
    return new Ability(rules);
}
