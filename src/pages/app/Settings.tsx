import {
    IonBackButton,
    IonButtons, IonCheckbox,
    IonContent,
    IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader,
    IonPage, IonRadio,
    IonTitle, IonToggle,
    IonToolbar,
    useIonViewWillEnter, useIonViewWillLeave, IonButton
} from "@ionic/react"
import React from 'react';
import {InAppBrowser} from "@ionic-native/in-app-browser";


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

    const configureEnelogic = () => {
        var site = InAppBrowser.create("https://enelogic.com/oauth/v2/auth?scope=account&redirect_uri=app.twomes.warmtewachter&response_type=code&client_id=9933_7c89q9lw7iscg84o8k0owccss8gc484ckw4g4ooo4kk8cwkck&access_type=offline");
        site.show();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle >Instellingen</IonTitle>
                    <IonButtons  slot="start">
                        <IonBackButton defaultHref="/home"  text=""/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {/*-- List of Input Items --*/}
                <IonList>
                    <IonListHeader>
                        <b>Categorie 1</b>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel>Input</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Toggle</IonLabel>
                        <IonToggle slot="end"></IonToggle>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonListHeader>
                        <b>Categorie 2</b>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel>Radio</IonLabel>
                        <IonRadio slot="end"></IonRadio>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Checkbox</IonLabel>
                        <IonCheckbox slot="end" />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Checkbox2</IonLabel>
                        <IonCheckbox slot="end" />
                    </IonItem>

                    <IonItem>
                        <IonLabel>Start Enelogic Flow</IonLabel>
                        <IonButton onClick={() => configureEnelogic()}></IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Settings;