import React from 'react';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Sensors.scss';
import {settingsSharp} from "ionicons/icons";

const Sensors: React.FC = () => {
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Sensors</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Sensors"/>
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
