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
import {hardwareChip, settingsSharp} from "ionicons/icons";
import {
    Plugins
} from '@capacitor/core';
import {Icons} from "../components/Icons";
const {LocalNotifications } = Plugins;
var sensorIcon = Icons().SensorIcon();

const Sensors: React.FC = () => {
    const [sensorArray, setSensorArray] = useState<object[]>([]);
    const [hardwareArray, setHardwareArray] = useState<object[]>([]);
    var sensorList: object[] = [];
    var hardwareList: object[] = [];

    useIonViewDidEnter(() => {
        sensorList = [
            {
                name : "Sensor 1",
                status: "connected"
            },
            {
                name : "Sensor 2",
                status: "disconnected"
            },
            {
                name : "Sensor 3",
                status: "disconnected"
            },
            {
                name : "Sensor 4",
                status: "connected"
            }
        ];
        setSensorArray(sensorList);
        hardwareList = [
            {
                name : "OpenTherm GateWay",
                status: "connected"
            },
            {
                name : "P1-Stick",
                status: "disconnected"
            }
        ];
        setHardwareArray(hardwareList);
    });
    const SensorNotWorking = ({number}: { number: any }) => {
        //Shows the notification with the given sensor number
        let CurrentTime = new Date();
        console.log(CurrentTime.getFullYear());
        console.log(CurrentTime.getMonth());
        console.log(CurrentTime.getDay());
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
                <IonButton onClick={() => SensorNotWorking({number: 2})}>
                    Sensor 2
                </IonButton>
                <div className="flex-container">
                {sensorArray.map((value: any) => (
                    <IonCard className="sensorCard">
                    <IonCardContent className={value.status}>
                    <div className="sensorIcon">
                    {sensorIcon}
                    </div>
                    {value.name}
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
                                {value.name}
                            </IonCardContent>
                        </IonCard>
                    ))}
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
