import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonButton,
    IonButtons, IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.scss';
import {checkmarkCircleOutline, settingsSharp} from "ionicons/icons";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {LocalStorage} from "../services/Storage";

var getItem = LocalStorage().getItem;
var setItem = LocalStorage().setItem;

const Home: React.FC = () => {

    const [instructionsChecked, setInstructionsChecked] = useState(false);

    // This function is called when the home screen is entered.
    // It checks the instruction status.

    useEffect(() => {
        if(!instructionsChecked) {
            getItem('instructionsCompleted').then((value) => {
                // First it checks if the value is set.
                // If not, the value is set to false and
                // the app redirects to the instructions page.
                if (value == null) {
                    setInstructionsChecked(true);
                    setItem('instructionsCompleted', 'false');
                    setItem('instructionStep', '1');
                    window.location.href = '/instructions'
                } else {
                    // If the value is already set, it checks whether the value is true or false.
                    // If the value is false, the app is redirected to the instructions page.
                    if (value === 'false') {
                        setInstructionsChecked(true);
                        window.location.href = '/instructions';
                    }
                }
            })
            setInstructionsChecked(true);
        }
    }, [])
    const SendNotification = ({message}: { message: any }) => {
        Push.hasPermission()
            .then((res: any) => {
                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We do not have permission to send push notifications');
                }
            });
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle slot="start">Home</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsSharp} color="dark"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="sensorcard">
                    <IonCardContent>
                        <IonItem lines="none">
                            <IonAvatar slot="start">
                                <IonIcon icon={checkmarkCircleOutline} color={'success'}/>
                            </IonAvatar>
                            <IonLabel>Uw sensoren zijn verbonden</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonButton onClick={() => SendNotification({message: "test"})}>Test notificatie</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
