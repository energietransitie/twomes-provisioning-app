import React, {useState} from 'react';
import {WifiWizard2} from "@ionic-native/wifi-wizard-2";

import './GetCurrentSSID.scss';
import {IonAvatar, IonButton, IonCard, IonContent, IonItem, IonLabel, IonList, useIonViewWillEnter} from "@ionic/react";


const GetCurrentSSID: React.FC = () => {

    const [currentSSID, setCurrentSSID] = useState(' ');
    const [scanResults, setScanResults] = useState([]);

    useIonViewWillEnter(() => {
        GetConnectedSSID();
        ScanAvailableNetworks();
    })

    // Get current connected SSID
    const GetConnectedSSID = () => {
        WifiWizard2.getConnectedSSID().then((value) => {
            console.log(value)
            setCurrentSSID(value);
        }, (err) => {
            console.log("Error: " + err)
        })
    }

    // Scan netwerken
    const ScanAvailableNetworks = () => {
        WifiWizard2.scan().then(function (results) {
            console.log(results.length, 'networks found! ');
            setScanResults(results);
            for (let i = 0; i < results.length; i++) {
                console.log(`SSID: ${results[i].SSID} Signaal: ${results[i].level}`)
            }
        }).catch(function (error) {
            console.log('Error getting results!', error);
            WifiWizard2.timeout(5000).then(function () {
            });
        });
    }


    const ConnectSsid = () => {
        WifiWizard2.connect(16, true, "A33E6C6D4575", "WPA").then((value) => {
            console.log('Succesfully connected.');
        }, (err) => {
            console.log("Error: " + err)
        })

    }

    const DisconnectSsid = () => {
        WifiWizard2.disconnect("H368N9E1028").then((value) => {
            console.log('Succesfully disconnected.');
        }, (err) => {
            console.log("Error: " + err)
        })

    }

    return (
        <IonContent>
            <IonCard>
                <h2>Op dit moment verbonden: <b>{currentSSID}</b></h2>

                {/*-- List of Text Items --*/}
                <h3>Wil je een ander netwerk gebruiken? Selecteer dan een ander netwerk.</h3>

                <IonList>
                    {scanResults.map((network) =>
                        <IonItem>
                            <IonAvatar slot="start">
                                <img src="public\assets\icon\.icon.png"/>
                            </IonAvatar>
                            <IonLabel color={'white'}>
                                <h2>{network['SSID']}</h2>
                                <h3>{network['capabilities']}</h3>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
            </IonCard>
        </IonContent>
    );
};

export default GetCurrentSSID;


