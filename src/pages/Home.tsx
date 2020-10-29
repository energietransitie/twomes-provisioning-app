import React, {useState} from 'react';
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
import {checkmarkCircleOutline, settingsOutline} from "ionicons/icons";

const Home: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle slot="start">Home</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsOutline} color="dark"/>
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
