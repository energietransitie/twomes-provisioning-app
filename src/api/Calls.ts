import DatabaseAPI from './DatabaseAPISettings';
import WeatherAPI from "./WeatherAPISettings";
import GatewayAPI from "./GatewayAPISettings";

export default {
    database: {
        getTemperature: function() {
            return DatabaseAPI.get('/temperature')
        },
    },
    weather: {
        getLocalWeather: function() {
            return WeatherAPI.get('localweather? geen idee')
        }
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