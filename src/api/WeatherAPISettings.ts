import axios from 'axios';
const lodash = require('lodash');

const weatherApiUrl = 'https://api.openweathermap.org';
const weatherApiKey = "00f531f732855ae9ec76a74d9b93cf75";

const WeatherAPI = axios.create({
    baseURL: weatherApiUrl,
    params: {
        appid: weatherApiKey,
        units: 'metric',
        lang: 'nl'
    }
});

WeatherAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default WeatherAPI;