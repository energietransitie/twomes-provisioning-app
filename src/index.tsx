import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {Plugins} from "@capacitor/core";
import { ApiService } from './services/ApiService';
import { StorageService } from './services/StorageService';

const { SplashScreen } = Plugins;

( async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        let authenticated = false; // Passed as a prop to <App /> which is then used to set the appropriate starting route.

        if (token) {
            const { session_token } = await ApiService.activateAccount(token);
            await StorageService.set('token', session_token);
            authenticated = true;
        }

        ReactDOM.render(<App authenticated={authenticated} />, document.getElementById('root'), () => {
            SplashScreen.hide();
        });

    } catch (e) {
        // TODO: Implement critical error and show some sort of error page or popup 
        console.log(e);
    }
})();
