import tokenService from './tokenService';

const BASE_URL = '/api/scores/';

export default {
    index,
    logScore
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

function logScore(score) {
    console.log(score);
    const options = {
        method: 'POST',
        headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(score)
    };
    return fetch(BASE_URL, options).then(res => res.json());
}