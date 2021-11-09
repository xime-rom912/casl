import {AbilityBuilder, Ability} from '@casl/ability';

function defineAbilityFor(profile) {
    return new Ability(defineRulesFor(profile));
}

function defineRulesFor(profile) {
  const builder = new AbilityBuilder(Ability);

  switch (profile.role) {
    case 'admin':
      defineAdminRules(builder, profile);
      break;
    case 'basicUser':
      defineBasicprofileRules(builder, profile);
      break;
  }

  return builder.rules;
}

function defineAdminRules({ can }) {
  can('manage', 'all');
}

function defineBasicUserRules({ can }, profile) {
  can('read', 'Movie');
}


module.exports = {
  defineRulesFor,
  defineAbilityFor,
};