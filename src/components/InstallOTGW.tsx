import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React from 'react';
import './InstallOTGW.scss';
import {InstructionsInterface} from "../services/InstructionsInterface";

const InstallOTGW: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    return (
        <IonCard className="instructions-card">
            <IonCardContent style={{width: "100%", height: '100%'}}>
                <IonLabel>Instructie OTGW</IonLabel>
                <IonButton className="instructions-next-button" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default InstallOTGW;
