import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './ConfigureWIFI.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";

const ConfigureWIFI: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
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
