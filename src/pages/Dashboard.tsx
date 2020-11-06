import React from 'react';
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
            }
            setItem('randomnumber', JSON.stringify(data));
        }, (err) => {
            getItem('randomnumber').then(value => {
                var data = JSON.parse(value!);
                console.log('no wifi, old value:' + data.apidata);
                console.log('timestamp: ' + data.timestamp);
            })
        });
    }

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
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
