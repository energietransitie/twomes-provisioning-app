import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardContent, IonItem, IonLabel, useIonViewDidEnter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Sensors.scss';
import {hardwareChip, settingsSharp, thermometer} from "ionicons/icons";
import {
    Plugins
} from '@capacitor/core';
const {LocalNotifications } = Plugins;

const Sensors: React.FC = () => {
    const [sensorArray, setSensorArray] = useState<object[]>([]);
    const [hardwareArray, setHardwareArray] = useState<object[]>([]);
    var sensorList: object[] = [];
    var hardwareList: object[] = [];

    useIonViewDidEnter(() => {
        //Lists with testdata for making the UI dynamic
        sensorList = [
            {
                name : "Sensor 1",
                status: "connected",
                lastReceived : "10-12-2020 11:44"
            },
            {
                name : "Sensor 2",
                status: "connected",
                lastReceived : "10-12-2020 11:44"
            },
            {
                name : "Sensor 3",
                status: "disconnected",
                lastReceived : "10-12-2020 09:44"
            },
            {
                name : "Sensor 4",
                status: "disconnected",
                lastReceived : "10-12-2020 09:44"
            }
        ];
        hardwareList = [
            {
                name : "OpenTherm GateWay",
                status: "disconnected",
                lastReceived : "10-12-2020 09:44"
            },
            {
                name : "P1-Stick",
                status: "connected",
                lastReceived : "10-12-2020 11:44"
            }
        ];
        setSensorArray(sensorList);
        setHardwareArray(hardwareList);
    });
    //For firing the notification
    const sensorNotWorking = ({number}: { number: any }) => {
        //Shows the notification with the given sensor number
        let CurrentTime = new Date();
        LocalNotifications.schedule({
            notifications : [
                {
                    title: "Sensorfout",
                    body: `Sensor ${number} werkt niet`,
                    //Creates an unique id based on milliseconds
                    id: new Date().getUTCMilliseconds(),
                    //Sets the red sensor icon
                    smallIcon: 'sensor_icon',
                    iconColor: "#FF5F58",
                    schedule: { on:{year: 2020, month: 11, day: 2, hour:CurrentTime.getHours(), minute:CurrentTime.getMinutes() + 1}}
                }
            ]
        });
        // Here are coming the changes in the ui
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle>Sensors</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsSharp} color="dark"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/*Button for testing the notification*/}
                <IonButton onClick={() => sensorNotWorking({number: 2})}>
                    Sensor 2
                </IonButton>
                <div className="flex-container">
                {sensorArray.map((value: any) => (
                    <IonCard className="sensorCard">
                    <IonCardContent className={value.status}>
                        <div>
                            <IonIcon className='sensorIcon' icon={thermometer}/>
                        </div>
                        <p className="cardInfo">
                            <b>{value.name}</b>
                            <br/>Laatst data ontvangen:
                            <br/><b>{value.lastReceived}</b>
                        </p>
                    </IonCardContent>
                    </IonCard>
                ))}
                </div>
                    {hardwareArray.map((value: any) => (
                        <IonCard className="hardwareCard">
                            <IonCardContent className={value.status}>
                                <div>
                                    <IonIcon className='hardwareIcon' icon={hardwareChip}/>
                                </div>
                                <p className="cardInfo">
                                    <b>{value.name}</b>
                                    <br/>Laatst data ontvangen:
                                    <br/><b>{value.lastReceived}</b>
                                </p>
                            </IonCardContent>
                        </IonCard>
                    ))}
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
