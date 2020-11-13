import React, {useState} from 'react';
import {WifiWizard2} from "@ionic-native/wifi-wizard-2";
import LoadingComponent from "../LoadingComponent";
import './WifiConfiguration.scss';
import {
    IonAvatar, IonBackButton,
    IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonContent, IonInput,
    IonItem,
    IonLabel,
    IonList, IonToolbar,
    useIonViewWillEnter,
    IonAlert
} from "@ionic/react";
import {render} from "react-dom";
import {log} from "util";

const WifiConfiguration: React.FC = () => {

    // Defining used variables
    const [currentSSID, setCurrentSSID] = useState('');
    const [scanResults, setScanResults] = useState([]);
    const [currentStep, setCurrentStep] = useState("1");
    const [currentNetwork, setCurrentNetwork] = useState('');
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [networkPassword, setNetworkPassword] = useState('');

    // These functions will be executed when the user is about to enter te view
    useIonViewWillEnter(() => {
        GetConnectedSSID();
        ScanAvailableNetworks();
    })

    // Go to the next step
    const stepUp = () => {
        var step = parseInt(currentStep) + 1;
        setCurrentStep(step.toString());
    }

    // Returns the security type from the given capabilities
    const subStringSecurity = (securityType: string) => securityType != null ? securityType.substring(1, securityType.indexOf('-')) : '';

    // Get current connected SSID
    const GetConnectedSSID = () => {
        WifiWizard2.getConnectedSSID().then((value) => {
            console.log(value)
            setCurrentSSID(value);
            setCurrentNetwork(value);
        }, (err) => {
            console.log("Error: " + err)
        })
    }

    // Check if Wifi is enabled
    const CheckIfWifiEnabled = () => WifiWizard2.isWifiEnabled().then((result) => result);

    const RequestPermission = () => WifiWizard2.requestPermission().then((result) => console.log(result));

    // This function enables the Wifi module
    const EnableWifi = () => WifiWizard2.enableWifi().then((result) => result).catch((error) => console.log(error));

    // Scan for available networks
    const ScanAvailableNetworks = () => {
        setShowLoading(false);

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

    const ConnectSsid = (ssid: string, password: any) => {
        WifiWizard2.connect(ssid, false, password, 'WPA').then((value) => {
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
            {currentStep === '1' && (
                <IonCard className="instructions-card">
                    <IonCardContent style={{width: "100%", height: '100%'}}>
                        {currentSSID !== '' ? (
                            <div>
                                <h2>Op dit moment verbonden: <b>{currentSSID}</b></h2>
                                <IonButton>
                                    Dit netwerk gebruiken
                                </IonButton>
                                <h3>Wil je een ander netwerk gebruiken? Selecteer dan een ander netwerk.</h3>
                            </div>
                        ) : (
                            <h2>Selecteer uw thuisnetwerk uit de onderstaande lijst.</h2>
                        )}
                        <IonButton onClick={() => RequestPermission()}>Request permission
                        </IonButton>
                        <IonButton onClick={() => EnableWifi()}>EnableWifi
                        </IonButton>
                        <IonContent>
                            <LoadingComponent showLoading={showLoading}/>
                        </IonContent>
                        {/*-- Render list of networks --*/}
                        <IonList>
                            {scanResults.length !== 0 ? (scanResults.map((network) =>
                                <IonItem onClick={() => {
                                    setCurrentNetwork(network['SSID']);
                                    setShowPasswordAlert(true)
                                }}>
                                    <IonAvatar slot="start">
                                        <img src="public\assets\icon\.icon.png"/>
                                    </IonAvatar>
                                    <IonLabel color={'white'}>
                                        <h2>{network['SSID']}</h2>
                                        <h3>{subStringSecurity(network['capabilities'])}</h3>
                                    </IonLabel>
                                </IonItem>
                            )) : (
                                <h3>Geen netwerken gevonden.</h3>
                            )}
                        </IonList>

                        {/*<IonButton className="instructions-next-button"*/}
                        {/*           onClick={() => stepUp()}>Volgende</IonButton>*/}
                    </IonCardContent>
                </IonCard>
            )}
            {currentStep === '2' && (
                <IonCard className="instructions-card">

                    <IonButton className="instructions-next-button"
                    >Test connectie</IonButton>
                </IonCard>
            )}
            {currentStep === '3' && (
                <IonCard className="instructions-card">
                    <IonItem>
                        <IonLabel>Check Connection</IonLabel>
                        <IonInput placeholder="placeholder" type="password"></IonInput>
                    </IonItem>
                </IonCard>
            )}
            <IonAlert
                isOpen={showPasswordAlert}
                onDidDismiss={() => setShowPasswordAlert(false)}
                cssClass='my-custom-class'
                header={'Wachtwoord'}
                message={`Vul het wachtwoord van netwerk <b>${currentNetwork}</b> in`}
                inputs={[
                    {
                        name: 'networkPassword',
                        type: 'password',
                        placeholder: 'Wachtwoord',
                        cssClass: 'specialClass',
                        attributes: {
                            minLength: 8,
                        }
                    }]}
                buttons={[
                    {
                        text: 'Test verbinding',
                        cssClass: 'primary',
                        handler: (alertData) => {
                            ConnectSsid(currentNetwork,alertData.networkPassword);
                            console.log(`SSID: ${currentNetwork} \n Password: ${alertData.networkPassword}`);
                        }
                    }]}
            />
        </IonContent>
    )
}

export default WifiConfiguration;


