import {
    IonButton,
    IonCard,
    IonCardContent,
    IonLabel,
    IonAlert,
    IonItem,
    useIonViewDidEnter,
    IonList
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
        checkBleutooth();
    });

    const checkBleutooth = () =>{
        BLE.enable();
        if(!BLE.isEnabled()){
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
                }, () => {
                    console.log("Peripheral is *not* connected");
                }
            );
        }, 2000)
    };

//    Opens the dialog asking to connect
const openDialog = (id: string) =>{
    setConnectDialog(true);
    //Sets the device to connect
    setdeviceID(id);
};
    return (
        <IonCard className="instructions-card">
            <LoadingComponent showLoading={showLoadingComponent}/>
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie OTGW</IonLabel>
                {!lastStep ? (
                    <IonButton className="instructions-next-button"
                               onClick={() => stepUpFunction()}>Volgende</IonButton>
                ) : (
                    <IonButton className="instructions-next-button"
                               onClick={() => finishFunction()}>Afronden</IonButton>
                )}
                <IonButton onClick={() => startScanning()}>Op apparaten scannen</IonButton>
                <IonList className="idList">
                    {bleIDArray.map((value: any) => (
                        <IonCard class="deviceCard" id={value.id} onClick={() => openDialog(value.id)}>
                            <IonCardContent>
                                {value.name} ({value.id})
                            </IonCardContent>
                        </IonCard>
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
