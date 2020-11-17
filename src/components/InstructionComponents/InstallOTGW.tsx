import {IonButton, IonCard, IonCardContent, IonLabel, IonAlert, IonItem} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './InstallOTGW.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {BLE} from "@ionic-native/ble";

const InstallOTGW: React.FC<InstructionsInterface> = ({stepUpFunction, finishFunction, lastStep}) => {

    const [OTGWStep, setOTGWStep] = useState(0);
    const [scanningBLE, setScanningBLE] = useState(false);
    const [BleIDArray, setBleIDArray] = useState<string[]>([]);

    const startScanning = () => {
        var list: string[] = [];
        BLE.startScan([]).subscribe(device => {
            console.log(JSON.stringify(device));
            list.push(device.id);
        });

        setTimeout(() => {
            BLE.stopScan().then(() => {
                setBleIDArray(list);
            });
        }, 5000);
    }

    const connect = (id: string) => {
            BLE.connect(id).subscribe((device) => {
                console.log('connected');
                console.log(JSON.stringify(device));
            }, (device) => {
                console.log('disconnected');
                console.log(JSON.stringify(device));
            })

        setInterval(() => {
            BLE.isConnected(
                id).then(() => {
                    console.log("Peripheral is connected");
                }, () => {
                    console.log("Peripheral is *not* connected");
                }
            );
        }, 2000)
    }

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
                <IonButton onClick={() => startScanning()}>Scan BLE Peripherals</IonButton>
                {BleIDArray.map((id: string) => (
                    <IonItem onClick={() => connect(id)}>
                        {id}
                    </IonItem>
                ))}
            </IonCardContent>
        </IonCard>
    )
}

export default InstallOTGW;
