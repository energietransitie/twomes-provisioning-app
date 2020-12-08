import {
    IonButton,
    IonCard,
    IonCardContent,
    IonLabel,
    IonAlert,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonThumbnail,
    IonList,
    IonItem,
    IonBadge,
    IonNote,
    IonRow,
    IonCol,
    IonAvatar,
    IonGrid,
    IonIcon,
    IonSpinner
} from '@ionic/react';
import React, {useState} from 'react';
import './InstallOTGW.scss';
import {
    closeCircleOutline, checkmarkCircleOutline
} from "ionicons/icons";
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {installationconfig} from '../../../package.json';

const InstallSensors: React.FC<InstructionsInterface> = ({stepUpFunction, finishFunction, lastStep}) => {

    const [OTGWStep, setOTGWStep] = useState(0);
    const [sensorIsLoading, setSensorIsLoading] = useState(false);

    // @ts-ignore
    return (
        <IonCard className="instructionsCard">
            <IonCardHeader>
                <IonBadge className={'stepCountBadge'}>Stap {installationconfig.OTGWstep}</IonBadge>
                <IonCardTitle>Installeren apparaat</IonCardTitle>
                <IonCardSubtitle className={'subTitleStep'}>Voer de onderstaande stappen uit om het apparaat te
                    configureren.</IonCardSubtitle>

            </IonCardHeader>
            <IonGrid className={"deviceStatusesGrid"}>
                <IonRow className={"titleStatusesDevices"}>Status apparaten:</IonRow>
                <IonRow>
                    <IonCol className={"centerContent"}>
                        <IonItem className={'ion-text-center'} lines="none">
                            <IonSpinner hidden={!sensorIsLoading} className={'weatherSpinner'}></IonSpinner>
                            <IonIcon hidden={sensorIsLoading} className={"statusIconSuccess"} icon={checkmarkCircleOutline}/>
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem  className={'ion-text-center'} lines="none">
                            <IonSpinner hidden={!sensorIsLoading} className={'weatherSpinner'}></IonSpinner>
                            <IonIcon hidden={sensorIsLoading} className={"statusIconError"} icon={closeCircleOutline}/>
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem class="ion-align-items-center" lines="none">
                            <IonSpinner hidden={!sensorIsLoading} className={'weatherSpinner'}></IonSpinner>
                            <IonIcon hidden={sensorIsLoading} className={"statusIconSuccess"} icon={checkmarkCircleOutline}/>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className={"centerContent"}>
                        <IonItem className={'ion-text-center'} lines="none">
                            Sensor 1
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem className={'ion-text-center'} lines="none">
                            Sensor 2
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem className={' '} lines="none">
                            P1-stick
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {/*<IonImg className={'instructionImage'} src="/assets/Instructions/OpenThermLogo.jpg"/>*/}
            <IonCardContent className={'instructionsContent'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                <IonItem lines="none">
                    <IonLabel> Lorem ipsum dolor sit amet</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>1</IonBadge>
                    </IonNote>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel> Lorem ipsum dolor sit amet</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>2</IonBadge>
                    </IonNote>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel> Lorem ipsum dolor sit amet</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>3</IonBadge>
                    </IonNote>
                </IonItem>
            </IonCardContent>
            {!lastStep ? (
                <IonButton className="instructionsNextButton" color={'warning'}
                           onClick={() => stepUpFunction()}>Volgende</IonButton>
            ) : (
                <IonButton className="instructionsNextButton" color={'warning'}
                           onClick={() => finishFunction()}>Afronden</IonButton>
            )}
        </IonCard>
    )
}

export default InstallSensors;
