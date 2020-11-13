import {IonButton, IonCard, IonCardContent, IonLabel, IonList} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './ConfigureWIFI.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {LocalStorage} from "../services/Storage";
import InstallOTGW from "./InstallOTGW";
import InstallP1 from "./InstallP1";
import InstallSensors from "./InstallSensors";

const ConfigureWIFI: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    const [currentStep, setCurrentStep] = useState('');
    const [currentStepSet, setCurrentStepSet] = useState(false);
    const getItem = LocalStorage().getItem;

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

             return (

        <IonCard className="instructions-card">
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie wifi configureren</IonLabel>
                <IonButton className="instructions-next-button" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default ConfigureWIFI;
