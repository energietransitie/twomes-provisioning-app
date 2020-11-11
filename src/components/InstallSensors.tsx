import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './InstallSensors.scss';
import {InstructionsInterface} from "../services/InstructionsInterface";

const InstallSensors: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    return (
        <IonCard className="instructions-card">
            <IonCardContent>
                <IonLabel>Instructie Sensoren</IonLabel>
                <IonButton className="instructions-next-button" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default InstallSensors;
