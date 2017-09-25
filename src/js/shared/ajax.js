import 'whatwg-fetch';
import {qs} from './utils';

const host = '';

export default {
    get: (path, params) => {
        if (params) {
            const s = qs(params);
            if (s !== '') {
                path += (path.indexOf('?') === -1 ? '?' : '&') + s;
            }
        }
        return fetch(host + path, {
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(r => r.json());
    },

    post: (path, data) => {
        return new Promise((resolve, reject) => {
            fetch(host + path, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(r => {
                if (r.status === 400) {
                    return r.json().then(reject);
                }

                if (r.status >= 200 && r.status < 300) {
                    return r.json().then(resolve);
                }

                return r;
            });
        });
    }
};
