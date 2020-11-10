import {
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonPage,
    useIonViewWillEnter,
    useIonViewWillLeave
} from "@ionic/react";
import React, {useEffect, useState} from 'react';
import {LocalStorage} from "../services/Storage";
import LoadingComponent from "../components/LoadingComponent";
import './Instructions.scss'

const getItem = LocalStorage().getItem;
const setItem = LocalStorage().setItem;

const Instructions: React.FC = () => {

    const [currentStep, setCurrentStep] = useState("0");
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
                setCurrentStep(value!);
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
                <IonContent>
                    <IonCard>
                        <IonCardContent>
                            De huidige stap is {currentStep}
                        </IonCardContent>
                        <IonButton onClick={() => stepUp()}>Stap omhoog</IonButton>
                        <IonButton onClick={() => completeInstructions()}>Instrucies afronden</IonButton>
                    </IonCard>
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
