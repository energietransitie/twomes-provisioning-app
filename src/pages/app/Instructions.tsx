import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    useIonViewWillLeave, IonToolbar, IonTitle, IonHeader
} from "@ionic/react";
import React, {useEffect, useState} from 'react';
import {LocalStorage} from "../../services/Storage";
import LoadingComponent from "../../components/LoadingComponent";
import InstallOTGW from "../../components/InstructionComponents/InstallOTGW";
import InstallP1 from "../../components/InstructionComponents/InstallP1";
import InstallSensors from "../../components/InstructionComponents/InstallSensors";
import ConfigureWIFI from "../../components/InstructionComponents/ConfigureWIFI";
import './Instructions.scss';
import {installationconfig} from '../../../package.json';

const getItem = LocalStorage().getItem;
const setItem = LocalStorage().setItem;

const Instructions: React.FC = () => {

    const [userID] = useState("1111");
    const [userIDChecked, setUserIDChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState("1");
    const [currentStepSet, setCurrentStepSet] = useState(false);
    const [stepsArray, setStepsArray] = useState<string[]>([]);
    // Hide tabbar on entering this page
    useIonViewWillEnter(() => {
        const tabBar = document.getElementById("tabBar");
        tabBar!.style.display = "none";
    })

    // Show tabbar on leaving this page
    useIonViewWillLeave(() => {
        const tabBar = document.getElementById("tabBar");
        tabBar!.style.display = "flex";
    })

    // Check the current step only once on loading the page
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

    // Set all necessary configuration steps based on the user's ID
    useEffect(() => {
        if(userID && !userIDChecked) {
            var firstNumberInID = userID.split("")[0];
            var stepArray: string[] = [];
            switch (firstNumberInID) {
                case "1":
                    stepArray.push(installationconfig.OTGWstep);
                    break;
                case "2":
                    stepArray.push(installationconfig.P1step);
                    stepArray.push(installationconfig.Sensorstep);
                    break;
                case "3":
                    stepArray.push(installationconfig.OTGWstep);
                    stepArray.push(installationconfig.P1step);
                    stepArray.push(installationconfig.Sensorstep);
                    break;
            }
            // WiFi configuration should always be done
            // Array is sorted after, based on the configuration in the package.json
            stepArray.push(installationconfig.WIFIstep);
            stepArray.sort();
            setCurrentStep(stepArray[0]);
            setStepsArray(stepArray);
            setItem('instructionStep', stepArray[0]);
            setUserIDChecked(true);
        }
    }, [userID])

    // Go to the next instruction step
    const stepUp = () => {
        var nextStep = stepsArray[stepsArray.indexOf(currentStep) + 1];
        setCurrentStep(nextStep);
        setItem('instructionStep', nextStep);
    }

    // Set the instructions to completed
    const completeInstructions = () => {
        setItem('instructionsCompleted', 'true');
        window.location.href = '/home';
    }

    if (currentStepSet && userIDChecked) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar className="gradientBackgroundColor">
                        <IonTitle slot="start">Instructies</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    {currentStep === installationconfig.OTGWstep && (
                        <InstallOTGW stepUpFunction={stepUp} finishFunction={completeInstructions} lastStep={userID.split("")[0] === "1"}/>
                    )}
                    {currentStep === installationconfig.P1step && (
                        <InstallP1 stepUpFunction={stepUp}/>
                    )}
                    {currentStep === installationconfig.Sensorstep && (
                        <InstallSensors stepUpFunction={stepUp} finishFunction={completeInstructions} lastStep={userID.split("")[0] !== "1"}/>
                    )}
                    {currentStep === installationconfig.WIFIstep && (
                        <ConfigureWIFI stepUpFunction={stepUp}/>
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