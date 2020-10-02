import tokenService from './tokenService';

const BASE_URL = '/api/scores/';

export default {
    index,
    logScore
};

function index(userBoolean) {
    console.log(userBoolean);
    const options = {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch(BASE_URL + '?userLoggedIn=' + userBoolean, options).then(res => res.json());
}

function logScore(score, userBoolean) {
    console.log(score, userBoolean);
    const options = {
        method: 'POST',
        headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
        },
        userBoolean: userBoolean,
        body: JSON.stringify(score)
    };
    return fetch(BASE_URL + '?userLoggedIn=' + userBoolean, options).then(res => res.json());
}