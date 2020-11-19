import React from 'react';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Sensors.scss';
import {settingsSharp} from "ionicons/icons";
import {
    Plugins
} from '@capacitor/core';
const {LocalNotifications } = Plugins;

const Sensors: React.FC = () => {
    const SensorNotWorking = ({number}: { number: any }) => {
        //Shows the notification with the given sensor number
        let CurrentTime = new Date();
        LocalNotifications.schedule({
            notifications : [
                {
                    title: "Sensorfout",
                    body: `Sensor ${number} werkt niet`,
                    //Creates an unique id based on milliseconds
                    id: new Date().getUTCMilliseconds(),
                    //Sets the red sensor icon
                    smallIcon: 'sensor_icon',
                    iconColor: "#FF5F58",
                    schedule: { on:{year: 2020, month: 10, day: 19, hour:CurrentTime.getHours(), minute:CurrentTime.getMinutes() + 1}}
                }
            ]
        });
        // Here are coming the changes in the ui
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle>Sensors</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsSharp} color="dark"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/*Button for testing the notification*/}
                <IonButton onClick={() => SensorNotWorking({number: 2})}>
                    Sensor 2
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
