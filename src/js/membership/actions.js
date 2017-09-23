import api from 'api';

import actions from '../actions';


actions.signin.listenAndPromise(api.signin);
actions.signout.listenAndPromise(api.signout);
actions.signup.listenAndPromise(api.signup);
actions.user.listenAndPromise(api.user);

export default actions;
