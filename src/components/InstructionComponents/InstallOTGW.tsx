import {IonButton, IonCard, IonCardContent, IonLabel, IonAlert} from '@ionic/react';
import React, {useState} from 'react';
import './InstallOTGW.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";

const InstallOTGW: React.FC<InstructionsInterface> = ({stepUpFunction, finishFunction, lastStep}) => {

    const [OTGWStep, setOTGWStep] = useState(0);

    return (
        <IonCard className="instructions-card">
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie OTGW</IonLabel>
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

export default InstallOTGW;
