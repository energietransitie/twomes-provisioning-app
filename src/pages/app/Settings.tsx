import {
    IonBackButton,
    IonButtons, IonCheckbox,
    IonContent,
    IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader,
    IonPage, IonRadio,
    IonTitle, IonToggle,
    IonToolbar,
    useIonViewWillEnter, useIonViewWillLeave, IonAvatar, IonIcon
} from "@ionic/react"
import React from 'react';
import './Settings.scss';
import {LocalStorage} from "../../services/Storage";
import {hardwareChip, thermometer} from "ionicons/icons";

const setItem = LocalStorage().setItem;

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

    const restartConfiguration = (step: string) => {
        setItem('instructionStep', step).then(() => {
            setItem('instructionsCompleted', 'false');
            window.location.href = '/instructions'
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle>Instellingen</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" text=""/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {/*-- List of Input Items --*/}
                <IonList lines="full">
                    <IonListHeader lines="full" className={'listHeader'}>
                        Configuraties
                    </IonListHeader>
                    <IonItem onClick={() => restartConfiguration('1')}>
                        <IonIcon slot="start" icon={hardwareChip} className={'settingsAvatar'}/>
                        <IonLabel>Herstart complete configuratie</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => restartConfiguration('3')}>
                        <IonIcon slot="start" icon={thermometer} className={'settingsAvatar'}/>
                        <IonLabel>Herstart sensor configuratie</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Settings;