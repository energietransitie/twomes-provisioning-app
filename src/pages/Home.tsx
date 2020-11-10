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
// import "webrtc";
import 'phonegap-plugin-push/types';
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
                    setItem('instructionStep', '0');
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
                <IonCard className="card">
                    <IonCardContent>
                        <IonItem lines="none" className="carditem">
                            <IonAvatar slot="start">
                                <IonIcon icon={checkmarkCircleOutline} color={'success'}/>
                            </IonAvatar>
                            <IonLabel>Uw sensoren zijn verbonden</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Home;
