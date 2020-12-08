import axios from 'axios';

let lodash = require('lodash');

let AppKey = "TwomesApplicatie"
let DatabaseApiUrl = "https://energietransitiewindesheim.nl:4444";
let DatabaseApiKey = "veilig";


const DatabaseAPI = axios.create({
    baseURL: DatabaseApiUrl,
    headers: {

    }
});

DatabaseAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default DatabaseAPI;