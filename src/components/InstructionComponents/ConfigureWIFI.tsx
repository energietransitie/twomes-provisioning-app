import {
    IonAvatar, IonBadge,
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonImg,
    IonItem,
    IonLabel,
    IonList, IonRow, IonSpinner,
    useIonViewWillEnter
} from '@ionic/react';
import {
    wifiOutline
} from "ionicons/icons";
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
import {installationconfig} from '../../../package.json';


const ConfigureWIFI: React.FC<InstructionsInterface> = ({stepUpFunction}) => {
    const [currentStep, setCurrentStep] = useState('');
    const [currentStepSet, setCurrentStepSet] = useState(false);
    const [currentNetwork, setCurrentNetwork] = useState('');
    const getItem = LocalStorage().getItem;
    const [alert, setAlert] = useState<any>({showBox: false})
    const [scanResults, setScanResults] = useState([]);
    const [showNetworks, setShowNetworks] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(true);

    // These functions will be executed when the user is about to enter te view
    useIonViewWillEnter(() => {
        startWifiConfig();
        resetBox();
    })

    // resets the alertbox
    const resetBox = () => {
        setAlert({showBox: false});
    }

    // starts all the wifi related methods
    const startWifiConfig = () => {
        checkIfWifiEnabled().then((result) => {
            if (result) {
                getConnectedSSID();
                scanAvailableNetworks();
            } else {
                showEnableWifiAlert();
                setTimeout(() => {
                    startWifiConfig();
                }, 300);
            }
        });
    }

    // Returns the security type from the given capabilities
    const subStringSecurity = (securityType: string) => securityType != null ? securityType.substring(1, securityType.indexOf('-')) : '';

    // Shows an alert that the wifi is disabled
    const showEnableWifiAlert = () => {
        let scanalertdata = {
            showBox: true,
            header: 'WiFi is uitgeschakeld.',
            message: "Schakel de WiFi van het apparaat aan om de configuratie voort te zetten.",
            buttons: [
                {
                    text: "Ok",
                    cssClass: "secondary",
                    handler: () => {
                        resetBox();
                    }
                }]
        };
        setAlert(scanalertdata);
    }


    // Get current connected SSID
    const getConnectedSSID = () => {
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
                            setShowNetworks(true);
                            resetBox();
                        }
                    },
                    {
                        text: 'Dit netwerk gebruiken',
                        handler: () => {
                            isConnectedToInternet();
                            resetBox();
                        }
                    }]
            };
            setAlert(scanalertdata);

        }, (err) => {
            console.log("Error: " + err)
        })
    }

    // shows an alert where the user can fill in the password of the network
    const showPasswordAlert = (networkSSID: string) => {
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
                        connectSsid(networkSSID, alertData.networkPassword);
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
                },
                // {
                //     name: 'checkbox1',
                //     type: 'checkbox',
                //     label: 'Wachtwoord tonen',
                //     value: passwordVisible,
                //     checked: (passwordInput: any) => {
                //         setPasswordVisible(!passwordVisible);
                //         passwordInput.type = 'text'
                //     }
                // }
            ]
        };
        setAlert(scanAlertData);
    }

    // Check if Wifi is enabled
    const checkIfWifiEnabled = () => WifiWizard2.isWifiEnabled().then((result) => result).catch((error) => console.log(error));

    // Check if connected to the internet
    const isConnectedToInternet = () => WifiWizard2.canPingWifiRouter().then((result) => {
        console.log(result)
    }).catch((error) => console.log(`error: ${error}`));

    // Scan for available networks
    const scanAvailableNetworks = () => {
        WifiWizard2.scan().then(function (results) {
            console.log(results.length, 'networks found! ');

            setScanResults(results);
            for (let i = 0; i < results.length; i++) {
                console.log(`SSID: ${results[i].SSID} Signaal: ${results[i].level}`)
                console.log(JSON.stringify(results[i]));
            }
            setIsSearching(false);

        }).catch(function (error) {
            console.log('Error getting results!', error);
        });
    }

    // returns the icon of the wifisignal based on the rssi
    const getSignalIcon = (rssi: number) => {
        rssi *= -1;
        if (rssi <= 67) {
            return "Wifi-3"
        } else if (rssi <= 70) {
            return "Wifi-2"
        } else {
            return "Wifi-1"
        }
    }

    // creates an connection between the device and the access point
    const connectSsid = (ssid: string, password: any) => {
        WifiWizard2.requestPermission().then((value) => {
            console.log(value);
            if (value == "PERMISSION_GRANTED") {
                WifiWizard2.connect(ssid, true, password, 'WPA').then((value) => {
                    console.log('Succesfully connected.');
                }, (err) => {
                    console.log("Error: " + err)
                })
            }
        }, (err) => {
            console.log("Error: " + err);
        })
    }

    return (
        <IonCard className="instructionsCard">
            <AlertBox {...alert}/>
            <IonCardHeader>
                <IonBadge className={'stepCountBadge'} color="success">Stap {installationconfig.WIFIstep}</IonBadge>
                <IonCardTitle>Configureren WiFi</IonCardTitle>
                <IonCardSubtitle className={'subTitleStep'}>Invullen inloggegevens van het
                    thuisnetwerk.</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="instructionsCardContent">
                <IonGrid hidden={currentNetwork == ""} className={"deviceStatusesGrid"}>
                    <IonRow>
                        <h3>Momenteel verbonden: <h2><b>{currentNetwork}</b></h2></h3>
                        <IonButton color={"warning"} onClick={() => showPasswordAlert(currentNetwork)}>
                            Dit netwerk gebruiken
                        </IonButton>
                    </IonRow>
                </IonGrid>
                <IonButton className={"searchWifiNetworksButton"} color={"warning"} onClick={() => {
                    setIsSearching(true);
                    scanAvailableNetworks();
                }}>
                    Opnieuw zoeken
                </IonButton>
                <IonContent className={isSearching ? "scrollListLoading" : "scrollList"}>
                    <IonCardContent className={isSearching ? "cardContentLoading" : "cardContent"}>
                        <IonRow hidden={!isSearching}>
                            <IonItem className={'centerWeatherSpinner'} lines="none">
                                <IonSpinner className={'weatherSpinner'}></IonSpinner>
                            </IonItem>
                        </IonRow>
                        <IonRow hidden={!isSearching}>
                            <IonItem className={'centerWeatherSpinner'} lines="none">
                                <h3>Netwerken zoeken...</h3>
                            </IonItem>
                        </IonRow>
                        <IonCardContent className={"cardContent"}>

                            <IonList hidden={isSearching} className={"networkList"}>
                                {scanResults.length !== 0 && (scanResults.map((network) => network['SSID'] != '' && network['SSID'] != currentNetwork &&
                                    <IonItem lines="none" button className={"itemNetwork"}
                                             onClick={() => showPasswordAlert(network['SSID'])
                                             }>
                                        <IonAvatar className={"centerContent"} slot="start">
                                            <IonImg className={"wifiSignalIcon"}
                                                    src={"/assets/Instructions/" + getSignalIcon(network["level"]) + ".png"}></IonImg>
                                        </IonAvatar>
                                        <IonLabel color={'white'}>
                                            <h2>{network['SSID']}</h2>
                                            <h3>{subStringSecurity(network['capabilities'])}</h3>
                                        </IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonCardContent>
                    </IonCardContent>
                </IonContent>

            </IonCardContent>
            <IonButton color={'warning'} className="instructionsNextButton"
                       onClick={() => stepUpFunction()}>Volgende</IonButton>
        </IonCard>
    )
}

export default ConfigureWIFI;
