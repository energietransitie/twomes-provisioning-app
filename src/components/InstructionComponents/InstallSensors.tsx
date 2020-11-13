import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './InstallSensors.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";

const InstallSensors: React.FC<InstructionsInterface> = ({stepUpFunction, finishFunction, lastStep}) => {
    return (
        <IonCard className="instructions-card">
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie Sensoren</IonLabel>
                {!lastStep ? (
                    <IonButton className="instructions-next-button"
                               onClick={() => stepUpFunction()}>Volgende</IonButton>
                ) : (
                    <IonButton className="instructions-next-button"
                               onClick={() => finishFunction()}>Afronden</IonButton>
                )}
            </IonCardContent>
        </IonCard>
    )
}

export default InstallSensors;
