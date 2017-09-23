import $ from '../../shared/ajax';


export default {
    signin: d => $.post('/api/v1/signin', d),

    signup: d => $.post('/api/v1/signup', d),

    signout: () => $.get('/api/v1/signout'),

    user: () => $.get('/api/v1/user')
};
