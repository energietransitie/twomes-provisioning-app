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
import {GenerateJWTToken} from "./services/GenerateJWTToken";
import {Icons} from "./components/Icons";
import API from "./api/Calls";
import {Plugins} from "@capacitor/core";

import { Debug } from './pages/Debug'

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
import LoadingComponent from "./components/LoadingComponent";
import AlertBox from "./components/AlertBox";

const dashboardIcon = Icons().DashboardIcon();
const homeIcon = Icons().HomeIcon();
const sensorsIcon = Icons().sensorsIcon();

const generateJWTToken = GenerateJWTToken().generateJWTToken;
const setItem = LocalStorage().setItem;
const getItem = LocalStorage().getItem;
const jwt = require('jsonwebtoken');
const fernet = require('fernet');
const Crypto = require('crypto');

const App: React.FC = () => {

    const [tokenChecked, setTokenChecked] = useState(false);
    const [linkChecked, setLinkChecked] = useState(false);
    const [firebaseTriggered, setFirebaseTriggered] = useState(false);
    const [firebaseOutsideTriggered, setFirebaseOutsideTriggered] = useState(false);

    const [showLoading, setShowLoading] = useState(false);
    const [alert, setAlert] = useState<any>({showBox: false});

    // Gets dynamic link when app is in the background while link is clicked
    FirebaseDynamicLinks.onDynamicLink().subscribe((data: any) => {
        localStorage.setItem("firebaseTriggered", 'true');
        console.log("dynamic Link triggered");
        console.log("data: " + JSON.stringify(data));
        const url = data.deepLink;
        const id = url.split('https://app.twomes.warmtewachter/')[1];
        console.log("userID: " + id);
        API.database.checkUserID(id).then((response) => {
            console.log(response.data);
            if(response.data === 0) {
                setItem("userID", id).then(() => {
                    generateJWTToken().then(() => {
                        setFirebaseOutsideTriggered(true);
                    });
                });
            } else {
                const alertdata = {
                    showBox: true,
                    header: "Fout",
                    message: "Het ID gekoppeld aan uw link is al in gebruik. Als dit niet klopt, of u heeft eerder een mobiel toestel geregistreerd en wilt deze veranderen, neem dan contact op met de afzender van uw ontvangen e-mail."
                }
                setAlert(alertdata);
            }
        }, (err) => {
            console.log(err.response);
            const erroralertdata = {
                showBox: true,
                header: "Fout",
                message: err.response
            }
            setAlert(erroralertdata);
        })

    });

    // Gets dynamic link when app is terminated while link is clicked
    FirebaseDynamicLinks.getDynamicLink().then((data) => {
        if(data) {
            localStorage.setItem("firebaseTriggered", 'true');
            console.log("dynamic Link triggered");
            console.log("data: " + JSON.stringify(data));
            const url = data.deepLink;
            const id = url.split('https://app.twomes.warmtewachter/')[1];
            console.log("userID: " + id);
            API.database.checkUserID(id).then((response) => {
                console.log(response.data);
                if(response.data === 0) {
                    setItem("userID", id).then(() => {
                        generateJWTToken().then(() => {
                            setFirebaseTriggered(true);
                        });
                    });
                } else {
                    const alertdata = {
                        showBox: true,
                        header: "Fout",
                        message: "Het ID gekoppeld aan uw link is al in gebruik. Als dit niet klopt, of u heeft eerder een mobiel toestel geregistreerd en wilt deze veranderen, neem dan contact op met de afzender van uw ontvangen e-mail."
                    }
                    setAlert(alertdata);
                }
            }, (err) => {
                console.log(err.response);
                const erroralertdata = {
                    showBox: true,
                    header: "Fout",
                    message: err.response
                }
                setAlert(erroralertdata);
            })
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

    return (
        <IonApp>
            <LoadingComponent showLoading={showLoading}/>
            <AlertBox {...alert}/>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/dashboard" component={Dashboard} exact={true}/>
                        <Route path="/sensors" component={Sensors}/>
                        <Route path="/settings" component={Settings} exact={true}/>
                        <Route path="/instructions" component={Instructions} exact={true}/>
                        <Route path="/error" component={Error} exact={true}/>
                        {/* <Route path="/" render={() => <Redirect to="/error"/>} exact={true}/> */}
                        <Route path="/" component={Debug} exact={true}/>
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