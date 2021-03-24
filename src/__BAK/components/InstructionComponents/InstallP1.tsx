import {IonButton, IonCard, IonCardContent, IonLabel} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './InstallP1.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import LoadingComponent from "../LoadingComponent";
import {BLEService} from "../../services/BLEService";
import {LocalStorage} from "../../services/Storage";
import AlertBox from "../AlertBox";
import API from "../../api/Calls";

const connectToPeripheral = BLEService().connectToPeripheral;
const writeWifiCredentials = BLEService().writeWifiCredentials;
const readWifiState = BLEService().readWifiState;
const readGatewayID = BLEService().readGatewayID;
const readBoilerID = BLEService().readBoilerID;
const readRoomID = BLEService().readRoomID;

const getItem = LocalStorage().getItem;

const InstallP1: React.FC<InstructionsInterface> = ({stepUpFunction, stepBackFunction, wifiSSID, wifiPassword, checkHardwareID}) => {

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
        if(!tokenLoaded) {
            getItem("JWTToken").then((data: any) => {
                setToken(data);
                setTokenLoaded(true);
            })
        }
    })

    const resetBox = () => {
        setAlert({showBox: false})
    }

    const uint8ToString = (array:any) => {
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
            console.log(devicedata.message);
            // if(checkHardwareID) {
            //     readHardwareID(devicedata.data.id).then((data: any) => {
            //         API.database.sendHardwareID(token, data.data).then((response) => {
            //             console.log("Hardware ID saved");
            //         }, (err) => {
            //             console.log(err);
            //         })
            //     }, (errdata: any) => {
            //         if(errdata.message == "This ID has no current connection.") {
            //             var alertdata = {
            //                 showBox: true,
            //                 header: "Fout",
            //                 message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
            //             }
            //             setShowLoading(false);
            //             setAlert(alertdata);
            //             return false;
            //         }
            //     })
            // }
            if(wifiSSID !== undefined && wifiPassword !== undefined) {
                writeWifiCredentials(devicedata.data.id, wifiSSID, wifiPassword).then((data:any) => {
                    checkWifiState(devicedata.data.id);
                }, (errdata: any) => {
                    if(errdata.ssid.message == "This ID has no current connection." || errdata.ssid.message == "This ID has no current connection.") {
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
            console.log(errdata.message);
            if(errdata.message == 'No Twomes device found') {
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
                if(stateRead == 'true') {
                    wifiState = true;
                }
            })
        }, 500)

        setTimeout(() => {
            clearInterval(interval);
            if(wifiState) {
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
                    if(errdata.message == "This ID has no current connection.") {
                        var alertdata = {
                            showBox: true,
                            header: "Fout",
                            message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                        }
                        setShowLoading(false);
                        setAlert(alertdata);
                    }
                    console.log(errdata);
                })
            }, (errdata: any) => {
                if(errdata.message == "This ID has no current connection.") {
                    var alertdata = {
                        showBox: true,
                        header: "Fout",
                        message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                    }
                    setShowLoading(false);
                    setAlert(alertdata);
                }
                console.log(errdata);
            })
            // API.database.sendHardwareID(token, data.data).then((response) => {
            //     console.log("Hardware ID saved");
            // }, (err) => {
            //     console.log(err);
            // })
        }, (errdata: any) => {
            if(errdata.message == "This ID has no current connection.") {
                var alertdata = {
                    showBox: true,
                    header: "Fout",
                    message: "De verbinding met het apparaat is verbroken. Probeer het opnieuw."
                }
                setShowLoading(false);
                setAlert(alertdata);
            }
            console.log(errdata);
        })
    }

    return (
        <div>
            <AlertBox {...alert}/>
            <LoadingComponent showLoading={showLoading}/>
            <IonCardContent className="instructionsCardContent">
                <p className={"stepText"}><strong>Stap 1:</strong> Zet uw BlueTooth aan.</p>
                <p className={"stepText"}><strong>Stap 2:</strong> Druk op de knop op de P1-stick. Er begint nu een lampje te knipperen in 'een patroon'.</p>
                <p className={"stepText"}><strong>Stap 3:</strong> Druk op de knop 'Verbind' hieronder.</p>
                <IonButton color={"warning"} className={"connectButton"} onClick={() => connectToP1()}>Verbind</IonButton>
                <IonButton color={"warning"} className={"connectButton"} onClick={() => retrieveIDS()}>Haal ID's op</IonButton>
                <p className={"stepText"}>Current connected Peripheral ID: {peripheralID}</p>
                <p className={"stepText"}>Current connected Peripheral RSSI: {peripheralRSSI}</p>
            </IonCardContent>
            <IonButton color={"warning"} onClick={() => stepBackFunction()}>Terug</IonButton>
            <IonButton color={"warning"} className="instructionsNextButton" onClick={() => stepUpFunction()}>Volgende</IonButton>
        </div>
    )
}

export default InstallP1;
