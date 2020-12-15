import axios from 'axios';

let lodash = require('lodash');

let appKey = "TwomesApplicatie"
let databaseApiUrl = "http://energietransitiewindesheim.nl:4444";



const DatabaseAPI = axios.create({
    baseURL: databaseApiUrl,
    headers: {
    }
});

DatabaseAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default DatabaseAPI;