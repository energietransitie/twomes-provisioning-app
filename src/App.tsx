import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/app/Home';
import Dashboard from './pages/app/Dashboard';
import Sensors from './pages/app/Sensors';
import Settings from "./pages/app/Settings";
import Instructions from "./pages/app/Instructions";
import Error from "./pages/Error";
import {LocalStorage} from "./services/Storage";
import {Icons} from "./components/Icons";
import API from "./api/Calls";
import {Plugins} from "@capacitor/core";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
//
// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import './theme/main.scss';

import {FirebaseDynamicLinks} from "@ionic-native/firebase-dynamic-links";

var dashboardIcon = Icons().DashboardIcon();
var homeIcon = Icons().HomeIcon();
var sensorsIcon = Icons().sensorsIcon();

const setItem = LocalStorage().setItem;
const getItem = LocalStorage().getItem;
const {Device} = Plugins;
const jwt = require('jsonwebtoken');
const fernet = require('fernet');
const Crypto = require('crypto');

const App: React.FC = () => {

    const [tokenChecked, setTokenChecked] = useState(false);
    const [linkChecked, setLinkChecked] = useState(false);
    const [firebaseTriggered, setFirebaseTriggered] = useState(false);
    const [firebaseOutsideTriggered, setFirebaseOutsideTriggered] = useState(false);

    // Gets dynamic link when app is in the background while link is clicked
    FirebaseDynamicLinks.onDynamicLink().subscribe((data: any) => {
        localStorage.setItem("firebaseTriggered", 'true');
        console.log("dynamic Link triggered");
        console.log("data: " + JSON.stringify(data));
        var url = data.deepLink;
        var id = url.split('https://app.twomes.warmtewachter/')[1];
        console.log("userID: " + id);
        setItem("userID", id);
        setFirebaseTriggered(true);
    });

    // Gets dynamic link when app is terminated while link is clicked
    FirebaseDynamicLinks.getDynamicLink().then((data) => {
        if(data) {
            localStorage.setItem("firebaseTriggered", 'true');
            console.log("dynamic Link triggered");
            console.log("data: " + JSON.stringify(data));
            var url = data.deepLink;
            var id = url.split('https://app.twomes.warmtewachter/')[1];
            console.log("userID: " + id);
            setItem("userID", id);
            setFirebaseOutsideTriggered(true);
        } else {
            console.log("geen link gevonden");
        }
    })

    useEffect(() => {
        if (!linkChecked && firebaseTriggered) {
            window.location.href = '/home';
            setLinkChecked(true);
        }
    }, [firebaseTriggered])

    useEffect(() => {
        if (!tokenChecked) {

            //Get encrypted key from API
            var key = Crypto.randomBytes(32).toString('base64');

            API.database.sendDeviceToken(key).then((response: any) => {
                console.log(key)
                var secret = new fernet.Secret(key);
                var token = new fernet.Token({
                    secret: secret,
                    token: response.data,
                    ttl: 0
                })

                var secretkey = token.decode();

                // Check if JWTToken exists and is still valid

                getItem("JWTToken").then((oldToken: any) => {
                    if (oldToken == null || oldToken == "") {
                        generateJWTToken(secretkey);
                    } else {
                        jwt.verify(oldToken, secretkey, (err: any, decoded: any) => {
                            console.log(decoded);
                            console.log(err);
                            if (decoded == undefined) {
                                generateJWTToken(secretkey);
                            }
                        });
                    }
                });
            }, (err) => {
                console.log(err)
            })
            setTokenChecked(true);
        }
    }, [firebaseTriggered, firebaseOutsideTriggered])

    // Generate JWT token based on secret key
    const generateJWTToken = (secret: string) => {
        var houseID = "";

        getItem("userID").then((userID: any) => {
            houseID = userID
        });

        var data = {
            "house_id": 132,
            "APIkey": "34TF5373W532455OBCMCA67E16S3D"
        }
        var signedToken = jwt.sign(data, secret, {expiresIn: '168h'})

        console.log(signedToken);

        setItem("JWTToken", signedToken);
        setTokenChecked(true);
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/dashboard" component={Dashboard} exact={true}/>
                        <Route path="/sensors" component={Sensors}/>
                        <Route path="/settings" component={Settings} exact={true}/>
                        <Route path="/instructions" component={Instructions} exact={true}/>
                        <Route path="/error" component={Error} exact={true}/>
                        <Route path="/" render={() => <Redirect to="/error"/>} exact={true}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom" id="tabBar">
                        <IonTabButton tab="home" href="/home">
                            {homeIcon}
                        </IonTabButton>
                        <IonTabButton tab="dashboard" href="/dashboard">
                            {dashboardIcon}
                        </IonTabButton>
                        <IonTabButton tab="sensors" href="/sensors">
                            {sensorsIcon}
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
}

export default App;
