import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonButton,
    IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCol,
    IonContent,
    IonHeader,
    IonIcon, IonImg, IonItem, IonLabel, IonLoading,
    IonPage, IonRow, IonSpinner,
    IonTitle,
    IonToolbar, useIonViewDidEnter
} from '@ionic/react';
import './Home.scss';
import {
    checkmarkCircle,
    settingsSharp,
    cloudy,
    cloudyNight,
    moon,
    sunny, reorderThree, thunderstorm, snow, rainy, arrowForwardOutline,
} from "ionicons/icons";
import {Link, Redirect} from "react-router-dom";
import {LocalStorage} from "../services/Storage";
import {Plugins} from "@capacitor/core";
import API from "../api/Calls";

const {Geolocation} = Plugins;
const Chart = require('chart.js');

const getItem = LocalStorage().getItem;
const setItem = LocalStorage().setItem;

const Home: React.FC = () => {

    const [weatherData, setWeatherData] = useState<any>();
    const [weatherIcon, setWeatherIcon] = useState<any>();
    const [instructionsChecked, setInstructionsChecked] = useState(false);
    const [weatherIsLoading, setWeatherIsLoading] = useState(true);
    const [chartsSet, setChartsSet] = useState(false);
    const [tested, setTested] = useState(false);

    useIonViewDidEnter(() => {
        getWeatherData();
    })

    // This function makes a call to the OpenWeatherAPI to receive weather data bases on the device's location.
    const getWeatherData = () => {
        Geolocation.getCurrentPosition().then((resp) => {
            API.weather.getLocalWeather(resp.coords.latitude, resp.coords.longitude).then((resp) => {
                setWeatherData(resp.data);

                // Get Ionic Icon instead of default OpenWeatherAPI icon
                let icon = assignWeatherIcon(resp.data.weather[0].icon);

                setWeatherIcon(icon); // sets Ionic icon
                setWeatherIsLoading(false); // hides loading spinner
            }, (err) => {
                console.log(err);
            });
        }).catch((error) => {
            console.log('Error getting location', error);
            return {};
        });
    }

    // This function assigns an Ionic icon instead of the default OpenWeahterAPI icons
    const assignWeatherIcon = (icon: string): any => {
        let isNight = icon.includes('n') ? true : false; // checks if it is day or night

        icon = icon.slice(0, -1); // removes last character

        switch (icon) {
            default :
                return isNight ? cloudyNight : cloudy; // clouds;
            case '01':
                return isNight ? moon : sunny; // sunny/clear sky
            case '02':
                return isNight ? cloudyNight : cloudy; // clouds
            case '03':
                return isNight ? cloudyNight : cloudy; // clouds
            case '04':
                return isNight ? cloudyNight : cloudy; // clouds
            case '09':
                return rainy; // rainy
            case '10':
                return rainy; // rainy
            case '11':
                return thunderstorm; // thunder
            case '13':
                return snow; // snow
            case '50':
                return reorderThree; // fog
        }
    }

    const goToInstructions = () => {
        setItem('instructionsCompleted', 'false');
        window.location.href = '/instructions'
    }

    // This function is called when the home screen is entered.
    // It checks the instruction status.

    useEffect(() => {
        if (!instructionsChecked) {
            getItem('instructionsCompleted').then((value) => {
                // First it checks if the value is set.
                // If not, the value is set to false and
                // the app redirects to the instructions page.
                if (value == null) {
                    setInstructionsChecked(true);
                    setItem('instructionsCompleted', 'false');
                    window.location.href = '/instructions'
                } else {
                    // If the value is already set, it checks whether the value is true or false.
                    // If the value is false, the app is redirected to the instructions page.
                    if (value === 'false') {
                        setInstructionsChecked(true);
                        window.location.href = '/instructions';
                    }
                }
            })
            setInstructionsChecked(true);
        }
    }, [])

    useEffect(() => {
        if(!tested) {
            API.database.createToken("123").then((response) => {
                console.log("Success");
                console.log(response.data);
            }, (err) => {
                console.log("Failure");
                console.log(err);
            })
            setTested(true);
        }
    })


    useEffect(() => {
        if (!chartsSet) {
            //Chart elements from doc are selected and charts are added to them
            var chartElement1 = document.getElementById('chart1');
            var chartElement2 = document.getElementById('chart2');
            var chartElement3 = document.getElementById('chart3');

            var chart1 = new Chart(chartElement1, {
                type: 'pie',
                data: {
                    datasets: [{
                        label: 'MockGraph',
                        data: [20, 30, 40],
                        backgroundColor: [
                            'rgba(255, 100, 100)',
                            'rgba(255, 150, 0)',
                            'rgba(255, 255, 30)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    responsive: true,
                    width: '30%'
                }
            });
            var chart2 = new Chart(chartElement2, {
                type: 'pie',
                data: {
                    datasets: [{
                        label: 'MockGraph2',
                        data: [50, 10, 5],
                        backgroundColor: [
                            'rgba(10, 150, 255)',
                            'rgba(0, 80, 255)',
                            'rgba(0, 40, 255)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    responsive: true
                }
            })
            var chart3 = new Chart(chartElement3, {
                type: 'pie',
                data: {
                    datasets: [{
                        label: 'MockGraph3',
                        data: [25, 25, 25],
                        backgroundColor: [
                            'rgba(0, 200, 0)',
                            'rgba(0, 150, 0)',
                            'rgba(0, 255, 0)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    responsive: true
                }
            })
            setChartsSet(true);
        }
    }, [chartsSet])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gradientBackgroundColor">
                    <IonTitle slot="start">Home</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/settings">
                            <IonIcon icon={settingsSharp} color="dark"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="sensorCard">
                    <IonCardContent className="sensorCardContent">
                        <IonItem lines="none">
                            <IonAvatar slot="start" className={"sensorAvatar"}>
                                <IonIcon className={"sensorIcon"} icon={checkmarkCircle} color={'success'}/>
                            </IonAvatar>
                            <IonLabel className={"ion-text-wrap"}>Uw sensoren zijn verbonden</IonLabel>

                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard className="weatherCard">
                    <IonCardContent>
                        <IonRow hidden={weatherIsLoading}>
                            <IonCol>
                                <IonItem className={'centerWeatherIcon'} lines="none">
                                    <IonIcon className={'weatherIcon'} icon={weatherIcon}/>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <h3 className={'weatherCityName'}>{weatherData != undefined ? weatherData?.name.charAt(0).toUpperCase() + weatherData?.name.slice(1) : ''}</h3>
                                <h3 className={'weatherDescription'}>{weatherData != undefined ? weatherData?.weather[0].description.charAt(0).toUpperCase() + weatherData?.weather[0].description.slice(1) : ''}</h3>
                                <h1 className={'temperatureHeader'}>{weatherData != undefined ? weatherData?.main?.temp.toFixed(1) + '°' : ''}</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow hidden={!weatherIsLoading}>
                            <IonItem className={'centerWeatherSpinner'} lines="none">
                                <IonSpinner className={'weatherSpinner'}></IonSpinner>
                            </IonItem>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
                <Link to={"/dashboard"} replace>
                    <IonCard className="dashboardCard">
                        <IonItem lines="none" className={"dashboardCardHeader"}>
                            <div className="chartContainer">
                                <canvas className="chart" id="chart1"/>
                            </div>
                            <div className="chartContainer">
                                <canvas className="chart" id="chart2"/>
                            </div>
                            <div className="chartContainer">
                                <canvas className="chart" id="chart3"/>
                            </div>
                        </IonItem>
                        <IonCardContent className={"dashboardCardContent"}>
                            <IonIcon className="dashboardIcon" icon={arrowForwardOutline}/>
                        </IonCardContent>
                    </IonCard>
                </Link>
                <IonItem>
                    <IonButton onClick={() => {
                        setInstructionsChecked(false);
                        window.location.href = '/instructions'
                    }}>Show Instructions</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Home;
