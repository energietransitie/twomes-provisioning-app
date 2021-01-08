import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRefresher,
    IonRefresherContent,
    IonCardHeader
} from '@ionic/react';
import './Dashboard.scss';
import {settingsSharp} from "ionicons/icons";
import API from "../../api/Calls";
import {LocalStorage} from "../../services/Storage";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent";
import {RefresherEventDetail} from '@ionic/core';

const setItem = LocalStorage().setItem;
const getItem = LocalStorage().getItem;
const localization = require("moment/locale/nl");
const chart = require('chart.js');

const Dashboard: React.FC = () => {

    const [dataSet, setDataSet] = useState(false);
    const [graphData1, setGraphData1] = useState<any>({});
    const [graphData2, setGraphData2] = useState<any>({});
    const [graphsSet, setGraphsSet] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const [oldData, setOldData] = useState(false);
    const [oldDataDate, setOldDataDate] = useState<any>("");

    //Set the locale for moment to the Netherlands
    moment.locale("nl", localization);

    // Fill datasets with data
    useEffect(() => {
        if (!dataSet || (dataSet && refreshing)) {
            var tempdata:any = [
                {
                    'electricity_delivered': 20,
                    'electricity_received': 41,
                    'time': moment().subtract(6, 'days')
                },
                {
                    'electricity_delivered': 18,
                    'electricity_received': 30,
                    'time': moment().subtract(5, 'days')
                },
                {
                    'electricity_delivered': 19,
                    'electricity_received': 38,
                    'time': moment().subtract(4, 'days')
                },
                {
                    'electricity_delivered': 18.5,
                    'electricity_received': 35,
                    'time': moment().subtract(3, 'days')
                },
                {
                    'electricity_delivered': 21,
                    'electricity_received': 45,
                    'time': moment().subtract(2, 'days')
                },
                {
                    'electricity_delivered': 20.5,
                    'electricity_received': 43,
                    'time': moment().subtract(1, 'days')
                },
                {
                    'electricity_delivered': 20,
                    'electricity_received': 37,
                    'time': moment()
                }
            ];
            setItem("HouseData", JSON.stringify(tempdata));
            getItem('JWTToken').then((token) => {

                // Retrieve housedata

                API.weather.getLocalWeather(10,10).then((response) => {
                    //tempdata = response.data;
                    var dataset1: any = {title: 'Gemiddelde kamertemperatuur in °C'};
                    var dataset2: any = {title: 'Gemiddelde pijptemperatuur in °C'};
                    var data1: string[] = [];
                    var data2: string[] = [];
                    var labels: string[] = [];
                    tempdata.forEach((dataitem: any) => {
                        data1.push(dataitem['electricity_delivered']);
                        data2.push(dataitem['electricity_received']);
                        var recorddate = moment(dataitem['time']).format('DD MMM');
                        labels.push(recorddate)
                    })
                    dataset1.data = data1;
                    dataset1.labels = labels;
                    dataset2.data = data2;
                    dataset2.labels = labels;
                    setGraphData1(dataset1);
                    setGraphData2(dataset2);
                    setDataSet(true);
                    setItem("HouseData", JSON.stringify(tempdata));
                }, (err) => {
                    console.log(err);
                    // If no data is retrieved, use data from last save
                    getItem("HouseData").then((data) => {
                        if(data !== null && data !== undefined) {
                            tempdata = JSON.parse(data);
                            var dataset1: any = {title: 'Gemiddelde kamertemperatuur in °C'};
                            var dataset2: any = {title: 'Gemiddelde pijptemperatuur in °C'};
                            var data1: string[] = [];
                            var data2: string[] = [];
                            var labels: string[] = [];
                            tempdata.forEach((dataitem: any) => {
                                data1.push(dataitem['electricity_delivered']);
                                data2.push(dataitem['electricity_received']);
                                var recorddate = moment(dataitem['time']).format('DD MMM');
                                labels.push(recorddate)
                            })
                            dataset1.data = data1;
                            dataset1.labels = labels;
                            dataset2.data = data2;
                            dataset2.labels = labels;
                            setGraphData1(dataset1);
                            setGraphData2(dataset2);
                            var date = moment(tempdata[tempdata.length -1].time).format("DD MMMM YYYY");
                            setOldDataDate(date);
                            setOldData(true);
                            setDataSet(true);
                        } else {
                            // If there is also no data from a last save, show error
                            setError(true);
                            setDataSet(true);
                        }
                    })
                })
            })
        }
    }, [refreshing])

    // Create charts based on datasets
    useEffect(() => {
        if ((!graphsSet && dataSet) || (graphsSet && refreshing)) {
            var chart1 = new chart("dataChart1", {
                type: 'line',
                data: {
                    labels: graphData1.labels,
                    datasets: [{
                        label: graphData1.title,
                        data: graphData1.data,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,153,51)', // Light orange
                        borderWidth: 4
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255)'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255)'
                            }
                        }]
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            })
            var chart2 = new chart("dataChart2", {
                type: 'line',
                data: {
                    labels: graphData2.labels,
                    datasets: [{
                        label: graphData2.title,
                        data: graphData2.data,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(0,255,128)', // Light green
                        borderWidth: 4
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255)'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255)'
                            }
                        }]
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            })
            setGraphsSet(true);
        }
    }, [dataSet, refreshing])


    // Refresh function, all useEffects with 'refreshing' as dependency will be triggered on pulldown
    const refresh = (event: CustomEvent<RefresherEventDetail>) => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            event.detail.complete();
        }, 500);
    }

    if (dataSet) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar className="gradientBackgroundColor">
                        <IonTitle>Dashboard</IonTitle>
                        <IonButtons slot="end">
                            <IonButton href="/settings">
                                <IonIcon icon={settingsSharp} color="dark"/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonRefresher slot="fixed" onIonRefresh={refresh}>
                        <IonRefresherContent/>
                    </IonRefresher>
                    {error ? (
                        <IonCard className="cardContent">
                            <IonCardHeader>Er is voor uw huishouden nog geen data bekend.</IonCardHeader>
                        </IonCard>
                    ) : (
                        <div>
                            {oldData && (
                                <IonCard className="cardContent">
                                    <IonCardHeader>Dit is eerder opgehaalde data van {oldDataDate}.</IonCardHeader>
                                </IonCard>

                            )}
                            <IonCard className="cardContent">
                                <IonCardContent>
                                    <div>
                                        <IonLabel className="graphTitle">{graphData1.title}</IonLabel>
                                        <canvas id="dataChart1"/>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                            <IonCard className="cardContent">
                                <IonCardContent>
                                    <div>
                                        <IonLabel className="graphTitle">{graphData2.title}</IonLabel>
                                        <canvas id="dataChart2"/>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    )}

                </IonContent>
            </IonPage>
        );
    } else {
        return (
            <IonPage>
                <LoadingComponent showLoading={true}/>
            </IonPage>
        )
    }
};

export default Dashboard;
