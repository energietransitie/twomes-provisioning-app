import axios from 'axios';
const lodash = require('lodash');

const WeatherApiUrl = 'https://api.openweathermap.org';
const WeatherApiKey = "00f531f732855ae9ec76a74d9b93cf75";

const WeatherAPI = axios.create({
    baseURL: WeatherApiUrl,
    params: {
        appid: WeatherApiKey,
        units: 'metric',
        lang: 'nl'
    }
});

WeatherAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default WeatherAPI;