import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Plugins} from "@capacitor/core";
const {LocalNotifications} = Plugins;
const {SplashScreen} = Plugins;

LocalNotifications.addListener("localNotificationReceived", (data: any) => {
    console.log('localNotification Received');
    console.log('data: ' + JSON.stringify(data));
})

setTimeout(() => {
    SplashScreen.hide();
}, 300);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
