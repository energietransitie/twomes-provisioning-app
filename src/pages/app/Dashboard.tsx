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
    IonRefresherContent
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

    //Set the locale for moment to the Netherlands
    moment.locale("nl", localization);

    // Fill datasets with data
    useEffect(() => {
        if (!dataSet || (dataSet && refreshing)) {
            var tempdata = [{
                "record_id": 17,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2":
                    null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1": 23,
                "electricity_delivered_to_t2": 23,
                "electricity_delivered_by_t1": 23,
                "electricity_delivered_by_t2": 23,
                "tariff_indicator": 23,
                "electricity_received": 23,
                "electricity_delivered": 23,
                "gas": 23,
                "time_gas": null,
                "time_gas_dst": "S"
            }, {
                "record_id": 18,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2": null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1":
                    2955336,
                "electricity_delivered_to_t2": 3403620,
                "electricity_delivered_by_t1": 2,
                "electricity_delivered_by_t2": 0,
                "tariff_indicator": 2,
                "electricity_received": 349,
                "electricity_delivered": 0,
                "gas": 2478797,
                "time_gas": null,
                "time_gas_dst": "S"
            }, {
                "record_id": 19,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2": null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1":
                    23,
                "electricity_delivered_to_t2": 23,
                "electricity_delivered_by_t1": 23,
                "electricity_delivered_by_t2": 23,
                "tariff_indicator": 23,
                "electricity_received": 23,
                "electricity_delivered": 23,
                "gas": 23,
                "time_gas": null,
                "time_gas_dst": "S"
            }, {
                "record_id": 20,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2": null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1":
                    2955336,
                "electricity_delivered_to_t2": 3403620,
                "electricity_delivered_by_t1": 2,
                "electricity_delivered_by_t2": 0,
                "tariff_indicator": 2,
                "electricity_received": 349,
                "electricity_delivered": 0,
                "gas": 2478797,
                "time_gas": null,
                "time_gas_dst": "S"
            }, {
                "record_id": 21,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2": null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1":
                    23,
                "electricity_delivered_to_t2": 23,
                "electricity_delivered_by_t1": 23,
                "electricity_delivered_by_t2": 23,
                "tariff_indicator": 23,
                "electricity_received": 23,
                "electricity_delivered": 23,
                "gas": 23,
                "time_gas": null,
                "time_gas_dst": "S"
            }, {
                "record_id": 22,
                "house_id": 132,
                "postal_code": "1234km",
                "house_number": 23,
                "house_number_addition": "",
                "smart_meter_id": "FF:FF:FF:FF:FF",
                "temperature_sensor_id": null,
                "system_id": null,
                "pipe_temp1": null,
                "pipe_temp2": null,
                "time": null,
                "room_temp": null,
                "time_dst": "S",
                "electricity_delivered_to_t1":
                    2955336,
                "electricity_delivered_to_t2": 3403620,
                "electricity_delivered_by_t1": 2,
                "electricity_delivered_by_t2": 0,
                "tariff_indicator": 2,
                "electricity_received": 349,
                "electricity_delivered": 0,
                "gas": 2478797,
                "time_gas": null,
                "time_gas_dst": "S"
            }]

            var dataset1: any = {title: 'Electricity Delivered'};
            var dataset2: any = {title: 'Electricity Received'};
            var data1: string[] = [];
            var data2: string[] = [];
            var labels: string[] = [];
            tempdata.forEach((dataitem: any) => {
                data1.push(dataitem['electricity_delivered']);
                data2.push(dataitem['electricity_received']);
                labels.push(dataitem['record_id'])
            })
            dataset1.data = data1;
            dataset1.labels = labels;
            dataset2.data = data2;
            dataset2.labels = labels;
            setGraphData1(dataset1);
            setGraphData2(dataset2);
            setDataSet(true);
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
                        borderColor: 'rgba(255,153,51)' // Light orange
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
                        borderColor: 'rgba(0,255,128)' // Light green
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
        }, 3000);
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
