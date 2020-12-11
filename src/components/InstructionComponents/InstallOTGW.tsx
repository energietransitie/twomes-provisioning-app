import {
    IonButton,
    IonCard,
    IonCardContent,
    IonLabel,
    IonAlert,
    IonItem,
    IonList,
    useIonViewDidEnter, IonAvatar
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './InstallOTGW.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {BLE} from "@ionic-native/ble";
import LoadingComponent from "../LoadingComponent";

const InstallOTGW: React.FC<InstructionsInterface> = ({stepUpFunction, finishFunction, lastStep}) => {

    const [OTGWStep, setOTGWStep] = useState(0);
    const [scanningBLE, setScanningBLE] = useState(false);
    const [bleIDArray, setBleIDArray] = useState<object[]>([]);
    const [showConnectDialog, setConnectDialog] = useState(false);
    const [showSuccessDialog, setSuccessDialog] = useState(false);
    const [showErrorDialog, setErrorDialog] = useState(false);
    const [deviceID, setdeviceID] = useState("");
    const [showLoadingComponent, setShowLoadingComponent] = useState(false);
    var list: object[] = [];

    useIonViewDidEnter(() => {
        checkBluetooth();
    });

    //Enables the bluetooth in Android, will give an alert in iOS if bluetooth is off
    const checkBluetooth = () => {
        BLE.enable();
        if (!BLE.isEnabled()) {
            alert("Zet uw Bluetooth aan om verbinding te kunnen maken met de apparaten.")
        }
    };
    const startScanning = () => {
        setShowLoadingComponent(true);
        //Scans for devices and add them to the list
        BLE.startScan([]).subscribe(device => {
            console.log(JSON.stringify(device));
            list.push({
                "id": device.id,
                "name": device.name
            });
        });

        setTimeout(() => {
            BLE.stopScan().then(() => {
                setBleIDArray(list);
                setShowLoadingComponent(false);
            });
        }, 5000);
    };

    //Connects to the given MAC-adress
    const connect = (id: string) => {
        setShowLoadingComponent(true);
        BLE.connect(id).subscribe((device) => {
            console.log('connected');
            console.log(JSON.stringify(device));
            setShowLoadingComponent(false);
            setSuccessDialog(true);
        }, (device) => {
            setShowLoadingComponent(false);
            setErrorDialog(true);
            console.log('disconnected');
            console.log(JSON.stringify(device));
        });

        setInterval(() => {
            BLE.isConnected(
                id).then(() => {
                    console.log("Peripheral is connected");
                    var string = "Hallo!"
                    var array = new Uint8Array(string.length);
                    for (var i = 0, l = string.length; i < l; i++) {
                        array[i] = string.charCodeAt(i);
                    }
                    BLE.write(id, "4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", array.buffer).then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                }
            );
        }, 10000)
    };

    //Opens the dialog asking to connect
    const openDialog = (id: string) => {
        setConnectDialog(true);
        //Sets the device to connect
        setdeviceID(id);
    };
    return (
        <IonCard className="instructionsCard">
            <LoadingComponent showLoading={showLoadingComponent}/>
            <IonCardContent className="instructionsCardContent">
                <IonLabel>Instructie OTGW</IonLabel>
                {!lastStep ? (
                    <IonButton className="instructionsNextButton"
                               onClick={() => stepUpFunction()}>Volgende</IonButton>
                ) : (
                    <IonButton className="instructionsNextButton"
                               onClick={() => finishFunction()}>Afronden</IonButton>
                )}
                <IonButton onClick={() => startScanning()}>Op apparaten scannen</IonButton>
                <IonList className="idList">
                    {bleIDArray.map((value: any) => (
                        <IonItem button id={value.id} onClick={() => openDialog(value.id)}>
                            <IonLabel color={'white'}>
                                <h2>{value.name}</h2>
                                <h3>{value.id}</h3>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonAlert
                    isOpen={showConnectDialog}
                    onDidDismiss={() => setConnectDialog(false)}
                    header={'Verbinden'}
                    message={'Weet u zeker dat u wilt verbinden met dit apparaat?'}
                    buttons={[
                        {
                            text: 'Annuleren',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                            }
                        },
                        {
                            text: 'Verbinden',
                            handler: () => {
                                connect(deviceID);
                            }
                        }
                    ]}
                />
                <IonAlert
                    isOpen={showSuccessDialog}
                    onDidDismiss={() => setSuccessDialog(false)}
                    header={'Verbonden'}
                    message={`Verbonden met ${deviceID}`}
                    buttons={[
                        {
                            text: 'Ok',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                            }
                        }
                    ]}
                />
                <IonAlert
                    isOpen={showErrorDialog}
                    onDidDismiss={() => setErrorDialog(false)}
                    header={'Verbinding mislukt'}
                    message={`Verbinding mislukt met ${deviceID}`}
                    buttons={[
                        {
                            text: 'Ok',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                            }
                        }
                    ]}
                />
            </IonCardContent>
        </IonCard>
    )
};

export default InstallOTGW;
