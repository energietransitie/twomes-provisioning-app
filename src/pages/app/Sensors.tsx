import React, {useEffect, useState} from 'react';
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
import './Sensors.scss';
import {hardwareChip, settingsSharp, thermometer} from "ionicons/icons";
import {Plugins} from '@capacitor/core';
import API from "../../api/Calls";
import moment from "moment";
import {LocalStorage} from "../../services/Storage";
import LoadingComponent from "../../components/LoadingComponent";

const {LocalNotifications} = Plugins;
const getItem = LocalStorage().getItem;

const Sensors: React.FC = () => {
    const [sensorArray, setSensorArray] = useState<object[]>([]);
    const [hardwareArray, setHardwareArray] = useState<object[]>([]);
    const [sensorStatusChecked, setSensorStatusChecked] = useState(false);
    const [dataUpToDate, setDataUpToDate] = useState(true);
    const [sensorOffline, setSensorOffline] = useState(false);
    const [oTGWOffline, setOTGWOffline] = useState(false);

    useEffect(() => {
        if (!sensorStatusChecked) {
            var sensorList: object[] = [];
            var hardwareList: object[] = [];
            //Lists with testdata for making the UI dynamic

            getItem("JWTToken").then((token) => {
                if (token !== null && token !== undefined) {
                    API.database.getHouseData(token).then((response) => {
                        var data = response.data;
                        var record = data[0];
                        console.log(record);
                        var temp1Up = record.pipe_temp1 !== null;
                        var temp2Up = record.pipe_temp2 !== null;
                        var oTGWUp = record.opentherm_id !== null;
                        var upToDate = moment(record.time).add(1, 'days').format("DD MMMM YYYY hh:mm:ss") >= moment().format("DD MMMM YYYY hh:mm:ss");
                        var sensor1 = {
                            name: "Sensor 1",
                            status: (temp1Up && upToDate) ? 'connected' : 'disconnected',
                            lastReceived: moment(record.time).format("DD MMMM YYYY hh:mm")
                        }
                        var sensor2 = {
                            name: "Sensor 2",
                            status: (temp2Up && upToDate) ? 'connected' : 'disconnected',
                            lastReceived: moment(record.time).format("DD MMMM YYYY hh:mm")
                        }
                        var OTGW = {
                            name: "OpenTherm Gateway",
                            status: (oTGWUp && upToDate) ? 'connected' : 'disconnected',
                            lastReceived: moment(record.time).format("DD MMMM YYYY hh:mm")
                        }
                        sensorList.push(sensor1);
                        sensorList.push(sensor2);
                        hardwareList.push(OTGW);
                        setSensorArray(sensorList);
                        setHardwareArray(hardwareList);
                        setDataUpToDate(upToDate);
                        setSensorOffline((!temp1Up || !temp2Up));
                        setOTGWOffline(!oTGWUp);
                    })
                }
                setSensorStatusChecked(true);
            })
        }
    });
    //For firing the notification
    const sensorNotWorking = ({number}: { number: any }) => {
        //Shows the notification with the given sensor number
        let currentTime = new Date();
        LocalNotifications.schedule({
            notifications: [
                {
                    title: "Sensorfout",
                    body: `Sensor ${number} werkt niet`,
                    //Creates an unique id based on milliseconds
                    id: new Date().getUTCMilliseconds(),
                    //Sets the red sensor icon
                    smallIcon: 'sensor_icon',
                    iconColor: "#FF5F58",
                    schedule: {
                        on: {
                            year: 2020,
                            month: 11,
                            day: 2,
                            hour: currentTime.getHours(),
                            minute: currentTime.getMinutes() + 1
                        }
                    }
                }
            ]
        });
        // Here are coming the changes in the ui
    };

    if (sensorStatusChecked) {
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

                    {!dataUpToDate && (
                        <IonCard className={"cardContent"}>
                            <IonCardContent>
                                <IonLabel className={"ion-text-wrap"}>De p1-stick heeft de laatste 24 uur
                                    geen nieuwe data verstuurd</IonLabel>
                            </IonCardContent>
                        </IonCard>
                    )}
                    {dataUpToDate && sensorOffline && (
                        <IonCard className={"cardContent"}>
                            <IonCardContent>
                                <IonLabel className={"ion-text-wrap"}>Eén of meerdere sensoren zijn niet
                                    (meer) verbonden</IonLabel>
                            </IonCardContent>
                        </IonCard>
                    )}

                    <div className="flexContainer">
                        {console.log(sensorArray)}
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

                    {!dataUpToDate && (
                        <IonCard className={"cardContent"}>
                            <IonCardContent>
                                <IonLabel className={"ion-text-wrap"}>De OpenTherm Gateway heeft de laatste 24 uur
                                    geen nieuwe data verstuurd</IonLabel>
                            </IonCardContent>
                        </IonCard>
                    )}
                    {dataUpToDate && oTGWOffline && (
                        <IonCard className={"cardContent"}>
                            <IonCardContent>
                                <IonLabel className={"ion-text-wrap"}>Eén of meerdere sensoren zijn niet
                                    (meer) verbonden</IonLabel>
                            </IonCardContent>
                        </IonCard>
                    )}

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
    } else {
        return (
            <IonPage>
                <LoadingComponent showLoading={true}/>
            </IonPage>
        )
    }
};

export default Sensors;
