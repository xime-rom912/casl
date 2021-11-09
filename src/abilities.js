import {AbilityBuilder, Ability} from '@casl/ability';

function defineAbilityFor(user) {
    return new Ability(defineRulesFor(user));
}

function defineRulesFor(user) {
  const builder = new AbilityBuilder(Ability);

  switch (user.role) {
    case 'admin':
      defineAdminRules(builder, user);
      break;
    case 'basicUser':
      defineBasicUserRules(builder, user);
      break;
  }

  return builder.rules;
}

function defineAdminRules({ can }) {
  can('manage', 'all');
}

function defineBasicUserRules({ can }, user) {
  can('read', 'Movie');
}


module.exports = {
  defineRulesFor,
  defineAbilityFor,
};