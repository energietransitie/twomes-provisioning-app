import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Dashboard.scss';
import {settingsSharp} from "ionicons/icons";
import API from "../api/Calls";
import {LocalStorage} from "../services/Storage";
import moment from "moment";
import {
    Plugins
} from '@capacitor/core';
const {LocalNotifications } = Plugins;

const setItem = LocalStorage().setItem;
const getItem = LocalStorage().getItem;
const localization = require("moment/locale/nl");

const Dashboard: React.FC = () => {
    //Set the locale for moment to the Netherlands
    moment.locale("nl", localization);

    //Get random Number function to test Storage functionality
    const getRandomNumber = () => {
        API.weather.getRandomNumber().then((response) => {
            var data = {
                apidata: response.data.toString(),
                timestamp: moment().format('hh:mm:ss DD-MM-YYYY') //Current time
            };
            setItem('randomnumber', JSON.stringify(data));
        }, (err) => {
            getItem('randomnumber').then(value => {
                var data = JSON.parse(value!);
                console.log('no wifi, old value:' + data.apidata);
                console.log('timestamp: ' + data.timestamp);
            })
        });
    };
    const SensorNotWorking = ({number}: { number: any }) => {
        //Shows the notification with the given sensor number
        let CurrentTime = new Date();
        LocalNotifications.schedule({
            notifications : [
                {
                    title: "Sensorfout",
                    body: `Sensor ${number} werkt niet!`,
                    //Creates an unique id based on milliseconds
                    id: new Date().getUTCMilliseconds(),
                    //Sets the red sensor icon
                    smallIcon: 'sensor_icon',
                    iconColor: "#FF5F58"
                }
            ]
        });
    // Here are coming the changes in the ui
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle>Dashboard</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsSharp} color="dark"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className="card">
                    <IonCardContent>
                        <IonItem lines="none" className="carditem">
                            <IonLabel>ChartJS</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonButton onClick={() => getRandomNumber()}>
                    Get Random Number
                </IonButton>
                {/*Button for testing the notification 2*/}
                <IonButton onClick={() => SensorNotWorking({number: 2})}>
                    Sensor 2
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
