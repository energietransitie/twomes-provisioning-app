import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {Plugins} from "@capacitor/core";
import { ApiService } from './services/ApiService';
import { StorageService } from './services/StorageService';
import { FDLService } from './services/FDLService';

const { SplashScreen } = Plugins;

FDLService.init();

( async () => {
    try {
        let authenticated = false;

        // Check Store for existing account token
        const storedToken = await StorageService.get('token');;
        authenticated = !!storedToken;

        // Register Listener for Firebase DynamicLinks holding an account activation token.
        FDLService.onFDLReceived(async (dynamicLink) => {
            if (dynamicLink.root === 'account' && dynamicLink.sub) {
                const token = dynamicLink.sub.root;
                const { session_token } = await ApiService.activateAccount(token);
                await StorageService.set('token', session_token);
                authenticated = true;
            }
        });

        ReactDOM.render(<App authenticated={authenticated} />, document.getElementById('root'), () => {
            SplashScreen.hide();
        });

    } catch (e) {
        // TODO: Implement critical error and show some sort of error page or popup 
        console.log(e);
    }
})();
