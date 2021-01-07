import DatabaseAPI from './DatabaseAPISettings';
import WeatherAPI from "./WeatherAPISettings";
import GatewayAPI from "./GatewayAPISettings";

export default {
    database: {
        getTemperature: function() {
            return DatabaseAPI.get('/temperature')
        },
        sendDeviceToken: function(houseID: string) {
            var url = `/startSession?house_id=${houseID}&house_key=34TF5373W532455OBCMCA67E16S3D`;
            return DatabaseAPI.get(url)
        },
        getHouseData: function(token: string) {
            var url = `/get/house/data?token=${token}`
            return DatabaseAPI.get(url);
        },
        sendHardwareID: function(token: string, id: string) {
            var url = '/';
            return DatabaseAPI.get(url);
        },
        checkUserID: function(id: string) {
            var url = `/get/house/registration?id=${id}`
            return DatabaseAPI.get(url);
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