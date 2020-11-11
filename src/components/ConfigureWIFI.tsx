import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './ConfigureWIFI.scss';
import {InstructionsInterface} from "../services/InstructionsInterface";

const ConfigureWIFI: React.FC<InstructionsInterface> = ({finishFunction}) => {
    return (
        <IonCard className="instructions-card">
            <IonCardContent style={{width: "100%", height: '100%'}}>
                <IonLabel>Instructie wifi configureren</IonLabel>
                <IonButton className="instructions-next-button" onClick={() => finishFunction()}>Afronden</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default ConfigureWIFI;
