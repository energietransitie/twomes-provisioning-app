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
        getLocalWeather: function(lat:number, lon:number) {
            return WeatherAPI.get(`/data/2.5/weather?lat=${lat}&lon=${lon}`)
        },
        getRandomNumber: function() {
            return WeatherAPI.get('/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
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