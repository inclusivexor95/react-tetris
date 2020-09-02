import tokenService from './tokenService';

const BASE_URL = '/api/scores/';

export default {
    index
};

function index() {
    const options = {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch(BASE_URL, options).then(res => res.json());
}