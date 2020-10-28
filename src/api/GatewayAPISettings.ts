import axios from 'axios';

let lodash = require('lodash');

let AppKey = "TwomesApplicatie"
let GatewayApiUrl = "192.168.4.1";

const GatewayAPI = axios.create({
    baseURL: GatewayApiUrl,
    headers: {

    }
});

GatewayAPI.interceptors.response.use(function (response): any {
    response.data = lodash.cloneDeep(response.data);
    return response;
})

export default GatewayAPI;