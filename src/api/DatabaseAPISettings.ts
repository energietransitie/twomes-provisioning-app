import axios from 'axios';
const https = require('https');

let lodash = require('lodash');

let AppKey = "TwomesApplicatie"
let DatabaseApiUrl = "http://energietransitiewindesheim.nl:4444";
let DatabaseApiKey = "veilig";

let WeatherApiUrl = 'Mooi weer wel';


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