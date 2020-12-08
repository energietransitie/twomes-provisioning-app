import DatabaseAPI from './DatabaseAPISettings';
import WeatherAPI from "./WeatherAPISettings";
import GatewayAPI from "./GatewayAPISettings";

export default {
    database: {
        getTemperature: function() {
            return DatabaseAPI.get('/temperature')
        },
        sendDeviceToken: function(data: any) {
            return DatabaseAPI.post('/geenideenog', data)
        }
    },
    weather: {
        getLocalWeather: function(lat:number, lon:number) {
            return WeatherAPI.get(`/data/2.5/weather?lat=${lat}&lon=${lon}`)
        },
    },
    gateway: {
        sendWIFICredentials: function(SSID: string, Password: string) {
            let data = {
                s: SSID,
                p: Password
            }
            return GatewayAPI.post('/wifisave', data);
        }
    }
}