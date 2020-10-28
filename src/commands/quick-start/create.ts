import {create} from '../../utils/create-utils';

const subcommand = 'create';

let options;

module.exports = {
  name: subcommand,
  run: async context => {
    return create(context);
  },
};