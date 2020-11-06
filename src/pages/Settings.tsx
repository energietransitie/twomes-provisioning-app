import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter, useIonViewWillLeave
} from "@ionic/react"
import React from 'react';

const Settings: React.FC = () => {

    useIonViewWillEnter(() => {
        const tabBar = document.getElementById("tabBar");
        tabBar!.style.display = "none";
    })

    useIonViewWillLeave(() => {
        const tabBar = document.getElementById("tabBar");
        tabBar!.style.display = "flex";
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" text=""/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonTitle>HALLO</IonTitle>
            </IonContent>
        </IonPage>
    )
}

export default Settings;