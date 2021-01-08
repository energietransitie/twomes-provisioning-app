import {
    IonButton,
    IonCardContent,
    IonLabel,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonBadge,
    IonNote,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonSpinner, IonList, IonContent
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './InstallSensors.scss';
import {
    closeCircleOutline, checkmarkCircleOutline
} from "ionicons/icons";
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {installationconfig} from '../../../package.json';

const InstallSensors: React.FC<InstructionsInterface> = ({
                                                             stepUpFunction,
                                                             finishFunction,
                                                             lastStep,
                                                             stepBackFunction
                                                         }) => {

    const [sensorIsLoading, setSensorIsLoading] = useState(false);
    const [sensor1Connected, setSensor1Connected] = useState(false);
    const [sensor2Connected, setSensor2Connected] = useState(false);
    const [timeoutsSet, setTimeoutsSet] = useState(false);

    useEffect(() => {
        if (!timeoutsSet) {
            setTimeout(() => {
                setSensor1Connected(true);
            }, 10000);
            setTimeout(() => {
                setSensor2Connected(true);
            }, 15000);
            setTimeoutsSet(true);
        }
    })

    return (
        <div>
            <IonCardHeader>
                <IonBadge className={'stepCountBadge'}>Stap {installationconfig.Sensorstep}</IonBadge>
                <IonCardTitle>Installeren sensoren</IonCardTitle>
            </IonCardHeader>
            <IonGrid className={"deviceStatusesGrid"}>
                <IonRow className={"titleStatusesDevices"}>Status apparaten:</IonRow>
                <IonRow>
                    <IonCol className={"centerContent"}>
                        <IonItem className={'ion-text-center'} lines="none">
                            <IonIcon hidden={sensorIsLoading} className={"statusIconSuccess"}
                                     icon={checkmarkCircleOutline}/>
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem className={'ion-text-center'} lines="none">
                            <IonIcon hidden={sensorIsLoading}
                                     className={sensor1Connected ? "statusIconSuccess" : "statusIconError"}
                                     icon={sensor1Connected ? checkmarkCircleOutline : closeCircleOutline}/>
                        </IonItem>
                    </IonCol>
                    <IonCol className={"centerContent"}>
                        <IonItem class="ion-align-items-center" lines="none">
                            <IonIcon hidden={sensorIsLoading}
                                     className={sensor2Connected ? "statusIconSuccess" : "statusIconError"}
                                     icon={sensor2Connected ? checkmarkCircleOutline : closeCircleOutline}/>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className={"centerContent"}>
                        <IonItem className={' '} lines="none">
                            P1-stick
                        </IonItem>
                    </IonCol>
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
                </IonRow>
            </IonGrid>

            <IonCardContent className={'instructionsContent sensorContent'}>
                <IonContent style={{overflowY: "scroll"}}>
                    <IonCardContent className={'cardContent'}>
                        <IonItem lines="none">
                            <IonLabel className={"ion-text-wrap stepText"}> Als hierboven wordt aangegeven dat de P1-stick
                                nog
                                niet
                                verbonden is, wacht dan tot deze is verbonden. Is dat na een minuut nog niet
                                gebeurd,
                                herhaal dan de vorige stap door op "Terug" te drukken.</IonLabel>
                            <IonNote className={"ionNoteSteps"} slot="start">
                                <IonBadge className={"stepBadge"}>1</IonBadge>
                            </IonNote>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel className={"ion-text-wrap stepText"}> Steek de stekker van sensor 1 in het stopcontact
                                en
                                klik
                                de sensor op de buis van de verwarming in de woonkamer.</IonLabel>
                            <IonNote className={"ionNoteSteps"} slot="start">
                                <IonBadge className={"stepBadge"}>2</IonBadge>
                            </IonNote>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel className={"ion-text-wrap stepText"}> Steek de stekker van sensor 2 in het stopcontact
                                en
                                klik
                                de sensor op de buis van de boiler.</IonLabel>
                            <IonNote className={"ionNoteSteps"} slot="start">
                                <IonBadge className={"stepBadge"}>3</IonBadge>
                            </IonNote>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel className={"ion-text-wrap stepText"}> Wacht tot hierboven wordt aangegeven dat beide
                                sensoren
                                succesvol zijn verbonden. Als dit na een minuut nog niet het geval is, trek dan de
                                stekker
                                uit het stopcontact van de sensor, wacht 10 seconden en steek de stekker weer in het
                                stopcontact.</IonLabel>
                            <IonNote className={"ionNoteSteps"} slot="start">
                                <IonBadge className={"stepBadge"}>4</IonBadge>
                            </IonNote>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel className={"ion-text-wrap stepText"}> Als het niet lukt, neem dan contact op met de
                                helpdesk.
                                Contactinformatie vindt u in de e-mail die u heeft ontvangen met de link naar deze
                                app.</IonLabel>
                            <IonNote className={"ionNoteSteps"} slot="start">
                                <IonBadge className={"stepBadge"}>5</IonBadge>
                            </IonNote>
                        </IonItem>
                    </IonCardContent>
                </IonContent>
            </IonCardContent>

            <IonButton color={"warning"} className="instructionsPreviousButton"
                       onClick={() => stepBackFunction()}>Terug</IonButton>
            {!lastStep ? (
                <IonButton className="instructionsNextButton" color={'warning'}
                           onClick={() => stepUpFunction()}>Volgende</IonButton>
            ) : (
                <IonButton className="instructionsNextButton" color={'warning'}
                           onClick={() => finishFunction()}>Afronden</IonButton>
            )}
        </div>
    )
}

export default InstallSensors;
