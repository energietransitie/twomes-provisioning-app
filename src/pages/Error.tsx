import {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonButton
} from '@ionic/react';
import React from 'react';
import {LocalStorage} from "../services/Storage";

const getItem = LocalStorage().getItem;
const setItem = LocalStorage().setItem;
const Error: React.FC = () => {

    const forceThrough = () => {
        setItem("firebaseLinkUsed", '1');
        window.location.href = '/home';
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle>WarmteWachter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="cardContent">
                    <IonCardHeader className="errorCardHeader">Welkom!</IonCardHeader>
                    <IonCardContent className="errorCardContent">Deze app is gebouwd voor het Twomes project. De app kan alleen gebruikt worden met
                        een link van de
                        organisatoren. Als u als testgebruiker bent aangewezen voor de WarmteWachter app, gebruik dan de
                        link die u heeft gekregen via de e-mail.</IonCardContent>
                </IonCard>
                <IonButton onClick={() => forceThrough()}>Ik ben developer!</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Error;