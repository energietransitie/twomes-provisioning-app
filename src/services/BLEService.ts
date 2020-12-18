import {BLE} from "@ionic-native/ble";

export function BLEService() {

    // Return promise that resolves when BlueTooth is turned on.
    // On android, it will try to turn on BlueTooth with BLE.enable();

    const checkBluetooth = () => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.enable();
            if (!BLE.isEnabled()) {
                reject({message: "Zet uw Bluetooth aan om verbinding te kunnen maken met de apparaten. Druk daarna op de knop op de gateway en op 'verbind' hieronder."})
            } else {
                resolve();
                console.log("BLE On");
            }
        })
        return new Promise(promiseFunction);
    };

    // Return promise that resolves when there is a Peripheral near the device with
    // the right conditions to connect to. Rejects when that is not the case or when BlueTooth is
    // not turned on.
    //
    // The right conditions are:
    // * The devicename starts with "Twomes"
    // * The RSSI is higher than -60

    const getTwomesPeripheral = () => {
        let promiseFunction = ((resolve: any, reject: any) => {
            checkBluetooth().then(() => {
                //Scans for devices and add them to the list
                let list: any = [];
                BLE.startScan([]).subscribe(device => {
                    console.log(JSON.stringify(device));
                    list.push(device);
                });
                setTimeout(() => {
                    BLE.stopScan().then(() => {
                        let potentialPeripherals: any[] = [];
                        if (list.length > 0) {
                            list.forEach((peripheral: any) => {
                                if (peripheral.name !== undefined && peripheral.name.indexOf('Twomes') !== -1) {
                                    potentialPeripherals.push(peripheral);
                                }
                            })
                            if(potentialPeripherals.length > 0) {
                                potentialPeripherals.sort((a: any, b: any) => {
                                    let aRSSI = a.rssi * -1;
                                    let bRSSI = b.rssi * -1;
                                    return aRSSI - bRSSI;
                                })
                                // if (potentialPeripherals[0].rssi >= -60) {
                                resolve({message: "success", data: potentialPeripherals[0]});
                                // } else {
                                //     reject({message: false})
                                // }
                            } else {
                                reject({message: false})
                            }
                        }
                    });
                }, 2500);
            }, (errdata: any) => {
                console.log(errdata.message);
                reject({message: errdata.message});
            });
        })
        return new Promise(promiseFunction);
    }

    // Returns promise that resolves on a successful connection with a Twomes BLE Peripheral
    // Rejects when no successful connection can be made or if there is no device available.

    const connectToPeripheral = () => {
        var promiseFunction = ((resolve: any, reject: any) => {
            getTwomesPeripheral().then((data: any) => {
                BLE.connect(data.data.id).subscribe((device) => {
                    console.log('connected');
                    console.log(JSON.stringify(device));
                    resolve({message: "connected", data: data.data.id});
                }, (device) => {
                    console.log('disconnected');
                    console.log(JSON.stringify(device));
                    reject({message: 'Connection failed'});
                });
            }, (errdata) => {
                if (errdata.message == "Zet uw Bluetooth aan om verbinding te kunnen maken met de apparaten. Druk daarna op de knop op de gateway en op 'verbind' hieronder.") {
                    reject({message: errdata.message})
                }
                if (errdata.message === false) {
                    reject({message: 'No Twomes device found'})
                }
            });
        })
        return new Promise(promiseFunction);
    }

    // Returns promise that resolves when the Write of the WIFI SSID to the Peripheral is successful.
    // Rejects when the write fails or connection with the Peripheral is lost

    const writeWifiSSID = (id: string, wifiSSID: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            console.log("device id: " + id);
            BLE.isConnected(id).then(() => {
                    var array = new Uint8Array(wifiSSID.length);
                    for (var i = 0, l = wifiSSID.length; i < l; i++) {
                        array[i] = wifiSSID.charCodeAt(i);
                    }
                    BLE.write(id, "f03f5d3a-3b97-11eb-adc1-0242ac120002", "f03f5f56-3b97-11eb-adc1-0242ac120002", array.buffer).then((success) => {
                        console.log("SUCCESS")
                        resolve({message: "success", data: success});
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error writing ssid", data: err});
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        });
        return new Promise(promiseFunction);
    }

    // Returns promise that resolves when the Write of the WIFI Password to the Peripheral is successful.
    // Rejects when the write fails or connection with the Peripheral is lost

    const writeWifiPassword = (id: string, wifiPassword: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.isConnected(id).then(() => {
                    var array = new Uint8Array(wifiPassword.length);
                    for (var i = 0, l = wifiPassword.length; i < l; i++) {
                        array[i] = wifiPassword.charCodeAt(i);
                    }
                    BLE.write(id, "f03f5d3a-3b97-11eb-adc1-0242ac120002", "f03f626c-3b97-11eb-adc1-0242ac120002", array.buffer).then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                        resolve({message: "success", data: success})
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error writing password", data: err});
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        });
        return new Promise(promiseFunction);
    }

    // Returns promise that executes both SSID and Password Writes. Resolves if both are successful, rejects when
    // one or both failed.

    const writeWifiCredentials = (id: string, wifiSSID: string, wifiPassword: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            writeWifiSSID(id, wifiSSID).then((data1: any) => {
                writeWifiPassword(id, wifiPassword).then((data2: any) => {
                    resolve({ssid: data1, password: data2});
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
        return new Promise(promiseFunction);
    }

    // Returns promise to read Wifi State from Peripheral. Resolves when reading is successful, rejects when the read fails
    // or connection with the Peripheral is lost.

    const readWifiState = (id: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.isConnected(id).then(() => {
                    BLE.read(id, "f03f5d3a-3b97-11eb-adc1-0242ac120002", "cc67f2ac-3b9a-11eb-adc1-0242ac120002").then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                        resolve({message: "success", data: success});
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error reading wifi state", data: err})
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        })
        return new Promise(promiseFunction);
    }

    // Returns promise to read Hardware ID from Peripheral. Resolves when reading is successful, rejects when the read fails
    // or connection with the Peripheral is lost.

    const readGatewayID = (id: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.isConnected(id).then(() => {
                    BLE.read(id, "f03f6352-3b97-11eb-adc1-0242ac120002", "aea448d8-3b9a-11eb-adc1-0242ac120002").then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                        resolve({message: "success", data: success})
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error reading gateway id", data: err})
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        })
        return new Promise(promiseFunction);
    }

    const readBoilerID = (id: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.isConnected(id).then(() => {
                    BLE.read(id, "f03f6352-3b97-11eb-adc1-0242ac120002", "5e8a7c74-412a-11eb-b378-0242ac130002").then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                        resolve({message: "success", data: success})
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error reading boiler id", data: err})
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        })
        return new Promise(promiseFunction);
    }

    const readRoomID = (id: string) => {
        let promiseFunction = ((resolve: any, reject: any) => {
            BLE.isConnected(id).then(() => {
                    BLE.read(id, "f03f6352-3b97-11eb-adc1-0242ac120002", "5e8a7f12-412a-11eb-b378-0242ac130002").then((success) => {
                        console.log("SUCCESS")
                        console.log(success);
                        resolve({message: "success", data: success})
                    }, (err) => {
                        console.log("FAILURE")
                        console.log(err);
                        reject({message: "error reading room id", data: err})
                    })
                }, () => {
                    console.log("Peripheral is *not* connected");
                    reject({message: "This ID has no current connection."})
                }
            );
        })
        return new Promise(promiseFunction);
    }

    return {
        connectToPeripheral: connectToPeripheral,
        writeWifiCredentials: writeWifiCredentials,
        readWifiState: readWifiState,
        readGatewayID: readGatewayID,
        readBoilerID: readBoilerID,
        readRoomID: readRoomID,
    }
}