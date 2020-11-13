import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './InstallP1.scss';
import {InstructionsInterface} from "../services/InstructionsInterface";

const InstallP1: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    return (
        <IonCard className="instructions-card">
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie P1-stick</IonLabel>
                <IonButton className="instructions-next-button" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default InstallP1;
