import axios from 'axios';

let lodash = require('lodash');

let AppKey = "TwomesApplicatie"
let WeatherApiUrl = 'Mooi weer wel';
let WeatherApiKey = "veilig";

const WeatherAPI = axios.create({
    baseURL: WeatherApiUrl,
    headers: {

    }
});

WeatherAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default WeatherAPI;