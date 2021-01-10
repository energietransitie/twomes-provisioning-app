import {
    IonAvatar,
    IonBadge,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg, IonInput,
    IonItem,
    IonLabel,
    IonList, IonModal,
    IonRow,
    IonSpinner,
    useIonViewWillEnter
} from '@ionic/react';
import {
    checkmarkCircle, informationCircle, informationCircleOutline,
    wifiOutline
} from "ionicons/icons";
import React, {useEffect, useState} from 'react';
import './ConfigureWIFI.scss';
import {InstructionsInterface} from "../../services/InstructionsInterface";
import {LocalStorage} from "../../services/Storage";
import {WifiConfig, WifiWizard2} from "@ionic-native/wifi-wizard-2";
import {installationconfig} from '../../../package.json';
import {Plugins} from '@capacitor/core';

const {Device} = Plugins;

const ConfigureWIFI: React.FC<InstructionsInterface> = ({stepUpFunction, router, wifiFunction}) => {
    const [currentStep, setCurrentStep] = useState('');
    const [currentStepSet, setCurrentStepSet] = useState(false);
    const [currentNetwork, setCurrentNetwork] = useState('');
    const getItem = LocalStorage().getItem;
    const [scanResults, setScanResults] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any>();
    const [passwordInput, setPasswordInput] = useState('');
    const [modalHeight, setModalHeight] = useState(0);
    const [devicePlatformm, setDevicePlatform] = useState('');

    // These functions will be executed when the user is about to enter the view
    useIonViewWillEnter(() => {
        WifiWizard2.requestPermission().then(() => {
            startWifiConfig();
        })

        // gets the default height of the page
        let pageHeight = (document.getElementsByClassName('ion-page')[0] as HTMLInputElement)?.offsetHeight;
        setModalHeight(pageHeight);
    })

    // checks the platform on which the app is running
    Device.getInfo().then((info) => {
        let devicePlatform = info.platform.toString();
        if (devicePlatform === "web") {
            setDevicePlatform('Browser');
        } else if (devicePlatform === "android") {
            setDevicePlatform('Android');
        } else if (devicePlatform === "ios") {
            setDevicePlatform('iOS');
        };
    });

    // fix height of modal when keyboard is active
    window.addEventListener('keyboardWillShow', (e) => {
            // @ts-ignore
            (document.querySelector('.modalCardAndroidBig .modal-wrapper') as HTMLElement).style.height = (`${modalHeight * 0.50}px`);
    });

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
                }, 500);
            }
        });
    }

    // Returns the security type from the given capabilities
    const subStringSecurity = (securityType: string) => securityType != null ? securityType.substring(1, securityType.indexOf('-')) : '';

    // Shows an alert that the wifi is disabled
    const showEnableWifiAlert = () => {
        setModalData({
            header: "WiFi is uitgeschakeld",
            message: "Schakel de WiFi van het apparaat aan om de configuratie voort te zetten.",
            buttonText: "Ok",
            isBigModal: false,
        })
        setShowModal(true);
    }

    // Get current connected SSID
    const getConnectedSSID = () => {
        WifiWizard2.getConnectedSSID().then((value) => {
            setCurrentNetwork(value);
            setModalData({
                header: "Huidige verbinding",
                message: `U bent momenteel verbonden met ${value}, wilt u dit netwerk gebruiken?`,
                buttonText: "Ok",
                buttonText2: "Ander netwerk",
                isBigModal: true,
                modalType: "currentConnection"
            })
            setShowModal(true);

        }, (err) => {
            console.log("Error: " + err)
        })
    }

    // shows an alert where the user can fill in the password of the network
    const showPasswordAlert = (networkSSID: string) => {
        setCurrentNetwork(networkSSID);
        setModalData({
            header: "Wachtwoord voor " + networkSSID,
            message: `Vul het wachtwoord van netwerk ${networkSSID} in.`,
            buttonText: "Gegevens opslaan",
            isBigModal: true,
            modalType: "password"
        });
        setShowModal(true);
    }

    // Check if Wifi is enabled
    const checkIfWifiEnabled = () => {return WifiWizard2.isWifiEnabled()};

    // Scan for available networks
    const scanAvailableNetworks = () => {
        WifiWizard2.scan().then(function (results) {
            setScanResults(results);
            setTimeout(() => {
                setIsSearching(false);
            }, 100);
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

    return (
        <div>
            <IonModal
                isOpen={showModal}
                cssClass={devicePlatformm === 'iOS' ? "modalCardIos" : (modalData?.isBigModal ? "modalCardAndroidBig" : "modalCardAndroidSmall")}
                swipeToClose={true}
                presentingElement={router || undefined}
                onDidDismiss={() => setShowModal(false)}
            >
                <IonContent className={"modalBackground"}>
                    <IonCardHeader className={"modalHeader"}>
                        <IonGrid>
                            <IonRow className={"centerContentModal"}>
                                <IonIcon className={"infoIconModal"} icon={informationCircleOutline} color={'success'}/>
                            </IonRow>
                        </IonGrid>
                        <h3 className={devicePlatformm === "iOS" ? "headingIos" : ""}>{modalData?.header}</h3>
                        <IonCardSubtitle className={'modalSubtitle'}>{modalData?.message}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent
                        className={devicePlatformm === 'Android' ? "passwordContentAndroid" : "passwordContentIos"}
                        hidden={modalData?.modalType != 'password'}>
                        <IonItem>
                            <IonInput minlength={8} type={passwordVisible ? 'text' : 'password'}
                                      placeholder="Wachtwoord"
                                      onIonChange={(e) => {
                                          setPasswordInput(e.detail.value!);
                                          wifiFunction(currentNetwork, passwordInput);
                                      }}>
                            </IonInput>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonCheckbox checked={passwordVisible}
                                         onIonChange={e => setPasswordVisible(e.detail.checked)}/>
                            <div className={"showPasswordLabel"}>Wachtwoord tonen</div>
                        </IonItem>
                    </IonCardContent>
                    <IonButton className={"modalButton1"} color="warning"
                               onClick={() => {
                                  modalData?.modalType == "currentConnection" ? showPasswordAlert(currentNetwork) : setShowModal(false)
                               }}>{modalData?.buttonText}</IonButton>
                    <IonButton hidden={modalData?.buttonText2 == undefined} className={"modalButton2"} color="warning"
                               onClick={() => setShowModal(false)}>{modalData?.buttonText2}</IonButton>
                </IonContent>
            </IonModal>

            <IonCardHeader>
                <IonBadge className={'stepCountBadge'} color="success">Stap {installationconfig.WIFIstep}</IonBadge>
                <IonCardTitle>Configureren WiFi</IonCardTitle>
                <IonCardSubtitle className={'subTitleStep'}>Invullen inloggegevens van uw
                    thuisnetwerk.</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="instructionsCardContent">
                <IonGrid hidden={currentNetwork == ""} className={"deviceStatusesGrid"}>
                    <IonRow>
                        <IonCol>
                            <h3>Verbonden: <h2><b>{currentNetwork}</b></h2></h3>
                        </IonCol>
                        <IonCol>
                            <IonButton color={"warning"} onClick={() => showPasswordAlert(currentNetwork)}>
                                Gebruik netwerk
                            </IonButton>
                        </IonCol>
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
                                <IonSpinner className={'weatherSpinner'}/>
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
                                                    src={"/assets/Instructions/" + getSignalIcon(network["level"]) + ".png"}/>
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
        </div>
    )
}

export default ConfigureWIFI;
