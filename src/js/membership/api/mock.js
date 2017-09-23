import {resolve, reject, first} from '../../shared/mock';
import samples from './samples.json';


export default {
    signin: credentials => {
        let errors;

        if (!credentials || !credentials.username) {
            errors = {username: [samples.errors.required]};
        }

        if (!credentials || !credentials.password) {
            errors = errors || {};
            errors.password = [samples.errors.required];
        }

        if (errors) {
            return reject(errors);
        }

        const u = first(
            samples.users,
            u => (u.username === credentials.username &&
                  u.password === credentials.password));

        if (!u) {
            return reject({__ERROR__: [samples.errors.signin]});
        }

        return resolve({username: u.username});
    },

    signup: () => reject({__ERROR__: [samples.errors.unavailable]}),

    signout: resolve,

    user: reject
};
