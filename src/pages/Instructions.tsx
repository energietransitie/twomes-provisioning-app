import {
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonContent,
    IonPage,
    useIonViewWillEnter,
    useIonViewWillLeave, IonList, IonToolbar, IonTitle, IonButtons, IonIcon, IonHeader
} from "@ionic/react";
import React, {useEffect, useState} from 'react';
import {LocalStorage} from "../services/Storage";
import LoadingComponent from "../components/LoadingComponent";
import InstallOTGW from "../components/InstallOTGW";
import InstallP1 from "../components/InstallP1";
import InstallSensors from "../components/InstallSensors";
import ConfigureWIFI from "../components/ConfigureWIFI";
import './Instructions.scss';
import {installationconfig} from '../../package.json';
import {settingsSharp} from "ionicons/icons";

const getItem = LocalStorage().getItem;
const setItem = LocalStorage().setItem;

const Instructions: React.FC = () => {

    const [userID] = useState("111")
    const [currentStep, setCurrentStep] = useState("1");
    const [currentStepSet, setCurrentStepSet] = useState(false);
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

    useEffect(() => {
        if (!currentStepSet) {
            getItem('instructionStep').then((value) => {
                if (value !== null) {
                    setCurrentStep(value);
                }
                setCurrentStepSet(true);
            })
        }
    }, [currentStepSet])

    const stepUp = () => {
        var step = parseInt(currentStep) + 1;
        setCurrentStep(step.toString());
        setItem('instructionStep', step.toString())
    }

    const completeInstructions = () => {
        setItem('instructionsCompleted', 'true');
        window.location.href = '/home';
    }

    if (currentStepSet) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar className="gradientBackgroundColor">
                        <IonTitle slot="start">Instrucies</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {currentStep === installationconfig.OTGWstep && (
                        <InstallOTGW stepUpFunction={stepUp}/>
                    )}
                    {currentStep === installationconfig.P1step && (
                        <InstallP1 stepUpFunction={stepUp}/>
                    )}
                    {currentStep === installationconfig.Sensorstep && (
                        <InstallSensors stepUpFunction={stepUp}/>
                    )}
                    {currentStep === installationconfig.WIFIstep && (
                        <ConfigureWIFI finishFunction={completeInstructions}/>
                    )}
                </IonContent>
            </IonPage>
        )
    } else {
        return (
            <IonPage>
                <IonContent>
                    <LoadingComponent showLoading={true}/>
                </IonContent>
            </IonPage>
        )
    }
}

export default Instructions;
