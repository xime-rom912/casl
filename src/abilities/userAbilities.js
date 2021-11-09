import {defineAbility} from '@casl/ability';

export default defineAbility((can, cannot) => {
    can('read', 'Movie')
    cannot('delete', 'Movie')
})