import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonList,
    useIonViewWillEnter
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './ConfigureWIFI.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {LocalStorage} from "../../services/Storage";
import InstallOTGW from "./InstallOTGW";
import InstallP1 from "./InstallP1";
import InstallSensors from "./InstallSensors";
import {WifiConfig, WifiWizard2} from "@ionic-native/wifi-wizard-2";
import LoadingComponent from "../LoadingComponent";
import AlertBox from "../AlertBox";
import {Build} from "ionicons/dist/types/stencil-public-runtime";


const ConfigureWIFI: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    const [currentStep, setCurrentStep] = useState('');
    const [currentStepSet, setCurrentStepSet] = useState(false);
    const [currentNetwork, setCurrentNetwork] = useState('');
    const getItem = LocalStorage().getItem;
    const [alert, setAlert] = useState<any>({showBox: false})
    const [scanResults, setScanResults] = useState([]);
    const [showNetworks, setShowNetworks] = useState(false);
    const [showLoadingComponent, setShowLoadingComponent] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);


    // These functions will be executed when the user is about to enter te view
    useIonViewWillEnter(() => {
        GetConnectedSSID();
        ScanAvailableNetworks();
        resetBox();

    })

    const resetBox = () => {
        setAlert({showBox: false});
    }

    // Returns the security type from the given capabilities
    const subStringSecurity = (securityType: string) => securityType != null ? securityType.substring(1, securityType.indexOf('-')) : '';

    // Get current connected SSID
    const GetConnectedSSID = () => {
        WifiWizard2.getConnectedSSID().then((value) => {
            setCurrentNetwork(value);
            let scanalertdata = {
                showBox: true,
                header: 'Huidige verbinding',
                message: `U bent momenteel verbonden met <b>${value}</b>, wilt u dit netwerk gebruiken?`,
                buttons: [
                    {
                        text: 'Ander netwerk selecteren',
                        cssClass: 'secondary',
                        handler: () => {
                            setShowLoadingComponent(true);
                            setShowNetworks(true);
                            resetBox();
                        }
                    },
                    {
                        text: 'Dit netwerk gebruiken',
                        handler: () => {
                            IsConnectedToInternet();
                            resetBox();
                        }
                    }]
            };
            setAlert(scanalertdata);

        }, (err) => {
            console.log("Error: " + err)
        })
    }

    const ShowPasswordAlert = (networkSSID: string) => {
        let scanAlertData = {
            showBox: true,
            header: 'Wachtwoord',
            message: `Vul het wachtwoord van netwerk <b>${networkSSID}</b> in`,
            onDidDismiss: resetBox,
            buttons: [
                {
                    text: 'Test verbinding',
                    cssClass: 'primary',
                    handler: (alertData: any) => {
                        ConnectSsid(networkSSID, alertData.networkPassword);
                        console.log(`SSID: ${networkSSID} \n Password: ${alertData.networkPassword}`);
                    }
                }],
            inputs: [
                {
                    name: 'networkPassword',
                    type: 'password',
                    autocomplete: 'no',
                    placeholder: 'Wachtwoord',
                    attributes: {
                        minLength: 8,
                    }
                }, {
                    name: 'checkbox1',
                    type: 'checkbox',
                    label: 'Wachtwoord tonen',
                    value: passwordVisible,
                    checked: (passwordInput: any) => {
                        setPasswordVisible(!passwordVisible);
                        passwordInput.type = 'text'
                    }
                }
            ]
        };
        setAlert(scanAlertData);
    }

    // Check if Wifi is enabled
    const CheckIfWifiEnabled = () => WifiWizard2.isWifiEnabled().then((result) => console.log(result)).catch((error) => console.log(error));

    const RequestPermission = () => WifiWizard2.requestPermission().then((result) => console.log(result)).catch((error) => console.log(error));

    // This function enables the Wifi module
    const EnableWifi = () => WifiWizard2.enableWifi().then((result) => result).catch((error) => console.log(error));


    // Check if connected to the internet
    const IsConnectedToInternet = () => WifiWizard2.canPingWifiRouter().then((result) => {
        console.log(result)
    }).catch((error) => console.log(`error: ${error}`));

    // Scan for available networks
    const ScanAvailableNetworks = () => {
        // setShowLoading(false);

        WifiWizard2.scan().then(function (results) {
            console.log(results.length, 'networks found! ');

            setScanResults(results);
            for (let i = 0; i < results.length; i++) {
                console.log(`SSID: ${results[i].SSID} Signaal: ${results[i].level}`)
                console.log(JSON.stringify(results[i]));
            }
            setShowLoadingComponent(false);

        }).catch(function (error) {
            console.log('Error getting results!', error);
            WifiWizard2.timeout(5000).then(function () {
            });
        });
    }

    const ConnectSsid = (ssid: string, password: any) => {
        // console.log('give SSID: ' + ssid);
        // var wifiConfig = WifiWizard2.formatWPAConfig(ssid, password, false);
        // var config = wifiConfig as WifiConfig;
        //
        // // console.log('give WifiConfigSSID:' + config.SSID)
        // // console.log('give WifiConfigAlgorithm:' + config.auth.algorithm);
        // // console.log('give WifiConfigPassword:' + config.auth.password);
        //
        // console.log(JSON.stringify(config));
        //
        //
        // WifiWizard2.add(config).then((success: any) => {
        //     console.log("Successfully added.");
        //
        //     WifiWizard2.enable(ssid).then((success: any) => {
        //         console.log("Successfully enabled.");
        //     }, (err: any) => {
        //         console.log("ERROR enabling: " + err)
        //     })
        // }, (err: any) => {
        //     console.log("ERROR adding: " + err);
        // })


        WifiWizard2.connect(ssid, true, password, 'WPA').then((value) => {
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
        <IonCard className="instructions-card">
            <LoadingComponent showLoading={showLoadingComponent}/>
            <AlertBox {...alert}/>
            <IonCardContent className="instructions-card-content">
                <IonLabel>Instructie wifi configureren</IonLabel>
                <div>
                    <h3>Momenteel verbonden: <h2><b>{currentNetwork}</b></h2></h3>
                </div>
                <IonButton onClick={() => ShowPasswordAlert(currentNetwork)}>
                    Dit netwerk gebruiken
                </IonButton>
                <IonList>
                    {scanResults.length !== 0 ? (scanResults.map((network) => network['SSID'] != '' && network['SSID'] != currentNetwork &&
                        <IonItem button onClick={() => ShowPasswordAlert(network['SSID'])
                        }>
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

                <IonButton className="instructions-next-button" onClick={() => stepUpFunction()}>Volgende</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default ConfigureWIFI;
