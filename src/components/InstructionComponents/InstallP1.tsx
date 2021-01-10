import {
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonItem,
    IonLabel, IonNote
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './InstallP1.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import LoadingComponent from "../LoadingComponent";
import {BLEService} from "../../services/BLEService";
import {LocalStorage} from "../../services/Storage";
import AlertBox from "../AlertBox";
import API from "../../api/Calls";
import {installationconfig} from "../../../package.json";
import {BLE} from "@ionic-native/ble";


const connectToPeripheral = BLEService().connectToPeripheral;
const writeWifiCredentials = BLEService().writeWifiCredentials;
const readWifiState = BLEService().readWifiState;
const readGatewayID = BLEService().readGatewayID;
const readBoilerID = BLEService().readBoilerID;
const readRoomID = BLEService().readRoomID;

const getItem = LocalStorage().getItem;

const InstallP1: React.FC<InstructionsInterface> = ({
                                                        stepUpFunction,
                                                        stepBackFunction,
                                                        wifiSSID,
                                                        wifiPassword,
                                                        checkHardwareID
                                                    }) => {

    const [showLoading, setShowLoading] = useState(false);
    const [alert, setAlert] = useState({showBox: false})
    const [token, setToken] = useState<any>();
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const [peripheralID, setPeripheralID] = useState("");
    const [peripheralRSSI, setPeripheralRSSI] = useState("");
    const [gatewayID, setGatewayID] = useState("");
    const [boilerID, setBoilerID] = useState("");
    const [roomID, setRoomID] = useState("");

    useEffect(() => {
        if (!tokenLoaded) {
            getItem("JWTToken").then((data: any) => {
                setToken(data);
                setTokenLoaded(true);
            })
        }
    })

    const resetBox = () => {
        setAlert({showBox: false})
    }

    const uint8ToString = (array: any) => {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    const connectToP1 = () => {
        setShowLoading(true);
        resetBox();
        connectToPeripheral().then((devicedata: any) => {
            setPeripheralID(devicedata.data.id);
            setPeripheralRSSI(devicedata.data.rssi);
            if (wifiSSID !== undefined && wifiPassword !== undefined) {
                writeWifiCredentials(devicedata.data.id, wifiSSID, wifiPassword).then((data: any) => {
                    checkWifiState(devicedata.data.id);
                }, (errdata: any) => {
                    if (errdata.ssid.message == "This ID has no current connection." || errdata.ssid.message == "This ID has no current connection.") {
                        var alertdata = {
                            showBox: true,
                            header: "Fout",
                            message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                        }
                        setShowLoading(false);
                        setAlert(alertdata);
                        return false;
                    }
                });
            }
        }).catch((errdata: any) => {
            if (errdata.message == 'No Twomes device found') {
                var alertdata = {
                    showBox: true,
                    header: "Fout",
                    message: "Er is geen correct apparaat gevonden. Probeer het opnieuw."
                }
                setShowLoading(false);
                setAlert(alertdata);
            } else {
                var data = {
                    showBox: true,
                    header: "Fout",
                    message: "Er is iets fout gegaan: " + errdata.message
                }
                setShowLoading(false);
                setAlert(data);
            }
        })
    }

    const checkWifiState = (id: string) => {
        let wifiState = false;
        let interval = setInterval(() => {
            readWifiState(id).then((data: any) => {
                var stateRead = uint8ToString(data.data);
                if (stateRead == 'true') {
                    wifiState = true;
                }
            })
        }, 500)

        setTimeout(() => {
            clearInterval(interval);
            if (wifiState) {
                var alertdata = {
                    showBox: true,
                    header: "Succes",
                    message: "De apparatuur is succesvol gekoppeld aan uw WIFI-netwerk. Druk nu op de knop ID's ophalen."
                }
                setShowLoading(false);
                setAlert(alertdata);
            } else {
                var errordata = {
                    showBox: true,
                    onDidDismiss: () => {
                        stepBackFunction()
                    },
                    header: "Fout",
                    message: "De apparatuur is niet succesvol gekoppeld aan uw WIFI-netwerk. Mogelijk is het wachtwoord verkeerd ingevuld. Probeer het opnieuw, of sla deze configuratiestap over.",
                    buttons: [{
                        text: "Overslaan",
                        role: 'cancel',
                        handler: () => {
                            stepUpFunction();
                        }
                    }, {
                        text: "Probeer opnieuw",
                        handler: () => {
                            stepBackFunction();
                        }
                    }
                    ]
                }
                setShowLoading(false);
                setAlert(errordata);
            }
        }, 4000)
    }

    const retrieveIDS = () => {
        resetBox();
        setShowLoading(true);
        readGatewayID(peripheralID).then((data: any) => {
            let gatewaystring = uint8ToString(data.data);
            setGatewayID(gatewaystring);
            readBoilerID(peripheralID).then((data: any) => {
                let boilerstring = uint8ToString(data.data);
                setBoilerID(boilerstring);
                readRoomID(peripheralID).then((data: any) => {
                    let roomstring = uint8ToString(data.data);
                    setRoomID(roomstring);
                    let successalert = {
                        showBox: true,
                        header: "Gelukt",
                        message: "Gateway ID: " + gatewayID + "; Boiler ID: " + boilerID + "; Room ID: " + roomID + ";"
                    }
                    setShowLoading(false);
                    setAlert(successalert);
                }, (errdata: any) => {
                    if (errdata.message == "This ID has no current connection.") {
                        var alertdata = {
                            showBox: true,
                            header: "Fout",
                            message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                        }
                        setShowLoading(false);
                        setAlert(alertdata);
                    }
                })
            }, (errdata: any) => {
                if (errdata.message == "This ID has no current connection.") {
                    var alertdata = {
                        showBox: true,
                        header: "Fout",
                        message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                    }
                    setShowLoading(false);
                    setAlert(alertdata);
                }
            })
            API.database.sendHardwareID(token, data.data).then((response) => {
            }, (err) => {
                console.log(err);
            })
        }, (errdata: any) => {
            if (errdata.message == "This ID has no current connection.") {
                var alertdata = {
                    showBox: true,
                    header: "Fout",
                    message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                }
                setShowLoading(false);
                setAlert(alertdata);
            }
        })
    }

    const connectToP1DEMO = () => {
        resetBox();
        setShowLoading(true);
        BLE.enable().then(() => {
            setTimeout(() => {
                var alertdata = {
                    showBox: true,
                    header: "Succes",
                    message: "De P1-stick is succesvol verbonden aan uw Wi-Fi netwerk."
                }
                setShowLoading(false);
                setAlert(alertdata);
            }, 5000)
        }, (err) => {

        })
    }

    return (
        <div>
            <AlertBox {...alert}/>
            <LoadingComponent showLoading={showLoading}/>
            <IonCardHeader>
                <IonBadge className={'stepCountBadge'}>Stap {installationconfig.P1step}</IonBadge>
                <IonCardTitle>Installeren en configureren P1-stick</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="instructionsCardContent">
                <IonItem lines="none">
                    <IonLabel className={"ion-text-wrap"}> Zet uw BlueTooth aan</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>1</IonBadge>
                    </IonNote>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel className={"ion-text-wrap"}> Klik de P1-stick in uw slimme meter.</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>2</IonBadge>
                    </IonNote>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel className={"ion-text-wrap"}> Druk op de knop op de P1-stick. Er begint nu een lampje te
                        knipperen.</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>3</IonBadge>
                    </IonNote>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel className={"ion-text-wrap"}> Druk op de knop 'Verbind' hieronder.</IonLabel>
                    <IonNote className={"ionNoteSteps"} slot="start">
                        <IonBadge className={"stepBadge"}>4</IonBadge>
                    </IonNote>
                </IonItem>
                <IonButton color={"warning"} className={"connectButton"}
                           onClick={() => connectToP1DEMO()}>Verbind</IonButton>
            </IonCardContent>
            <IonButton color={"warning"} className="instructionsPreviousButton"
                       onClick={() => stepBackFunction()}>Terug</IonButton>
            <IonButton color={"warning"} className="instructionsNextButton"
                       onClick={() => stepUpFunction()}>Volgende</IonButton>
        </div>
    )
}

export default InstallP1;
