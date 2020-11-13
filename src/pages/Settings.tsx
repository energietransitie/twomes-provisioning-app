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
import WifiConfiguration from "../components/WifiConfiguration/WifiConfiguration";


const Settings: React.FC = () => {

    //Hide tabbar on entering this page
    useIonViewWillEnter(() => {
        const tabBar = document.getElementById("tabBar");
        tabBar!.style.display = "none";
    })

    //Show tabbar on leaving this page
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
                <IonTitle></IonTitle>
                <WifiConfiguration/>
            </IonContent>
        </IonPage>
    )
}

export default Settings;