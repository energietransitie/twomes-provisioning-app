import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './InstallP1.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";

const InstallP1: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    return (
        <IonCard className="instructionsCard">
            <IonCardContent className="instructionsCardContent">
                <IonLabel>Instructie P1-stick</IonLabel>
                <IonButton className="instructionsNextButton" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default InstallP1;
