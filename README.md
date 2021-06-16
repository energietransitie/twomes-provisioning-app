# Twomes WarmteWachter

This repository contains the source code for the WarmteWachter App for both Android and iOS. The WarmteWachter app helps a user to install and connect one or more Twomes measurement devices in his home and to start, monitor and stop acquisition of monitoring data related to the heating of his/her home. 

## Table of contents
* [General info](#general-info)
* [Prerequisites](#prerequisites)
* [Deploying](#deploying)
* [Developing](#developing) 
* [Features](#features)
* [Status](#status)
* [License](#license)
* [Credits](#credits)

## General info
The app is meant to be installed automatically by clicking on e-mail invitation on your smartphone that contains a Firebase Dynamic Link, which automatically selects the proper app from the proper app store, installs it and activates the user's account using the account activation token in the Firebase Dynamic Link. The user is then asked to proceed by scanning, one-by-one, the QR-code that is attached to each Twomes measurement device that has been sent to the home address of the user. For each device scanned, the proper device installation instructions are retrieved from the Twomes server and presented. The app then connects with the device, which then scans for available Wi-Fi networks. The user is asked to select their home Wi-Fi network from the list of available networks and supply the password for that network. If everything has been entered correctly, the user is notified the setup was complete and succesful and can choose to configure the next device.

## Prerequisites
To deploy and sucessfully use the WarmteWachter app you need to have received an e-mail with a proper Firebase Dynamic Link and you need be in the possession of at least one Twomes measurment device.

## Deploying
LTS version is available in both the Apple App Store and Google Play Store. For beta versions an invite is required. To receive an invite please contact [@henriterhofte](https://github.com/henriterhofte). Please include in your request the Email address of the Apple ID or Google Account that's being used on the device you wish to install the WarmteWachter app.

## Developing
For getting started with the development of the WarmteWachter app see [Developing - Getting Started](./docs/developing.md).

## Features
List of features ready and TODOs for future development. Ready:

- [x] Activate your account using a Firebase Dynamic Link.
- [x] Scan the QR code of any Twomes measurment device.
- [x] Present device specific 'Installation Instructions' that have been fetched from the Twomes backoffice server.
- [x] Connect via BLE to a Twomes measurement device to provision internet connectivity via your home Wi-Fi network.
- [x] Have a connected measurement device scan for available Wifi-networks and present these.
- [x] Provision (write network credentials to) a measurement device.
- [x] Verify successful device provisioning with the Twomes backoffice server by checking for a measurement (heartbeat) from the measurement device.

To-do:

- [ ] Connect via SoftAP to a Twomes measurement device to provision internet connectivity via your home Wi-Fi network;
- [ ] More complete non-happy flow coverage;
- [ ] Improved and translated error handling for known errors.
- [ ] Usability improvements.
- [ ] Use the production Backoffice API instead of the testing API.

## Status
Project is: _in progress_

Current version is stable. Room for improvement.

## License
This software is available under the [Apache 2.0 license](./LICENSE), Copyright 2021 [Research group Energy Transition, Windesheim University of Applied Sciences](https://windesheim.nl/energietransitie) 

## Credits
This software is a collaborative effort of:
* Wietske Veneberg · [@WVeneberg](https://github.com/WVeneberg)
* Amicia Smit · [@AmiciaSmit](https://github.com/AmiciaSmit)
* Marco Prins · [@mk-prins](https://github.com/mk-prins)

Thanks also go to:
* <thanks name 1> · [@Github_handle_1](https://github.com/<github_handle_1>) · Twitter [@Twitter_handle_1](https://twitter.com/<twitter_handle_1>)
* <thanks name 2> · [@Github_handle_2](https://github.com/<github_handle_2>) · Twitter [@Twitter_handle_2](https://twitter.com/<twitter_handle_2>)
* <thanks name 3> · [@Github_handle_3](https://github.com/<github_handle_3>) · Twitter [@Twitter_handle_3](https://twitter.com/<twitter_handle_3>)
* etc. 

Product owner:
* Henri ter Hofte · [@henriterhofte](https://github.com/henriterhofte) · Twitter [@HeNRGi](https://twitter.com/HeNRGi)

We use and gratefully aknowlegde the efforts of the makers of the following source code and libraries:
* [Typescript](https://github.com/microsoft/TypeScript), by Microsoft, licensed under [Apache 2.0](https://github.com/microsoft/TypeScript/blob/master/LICENSE.txt)
* [React](https://github.com/facebook/react/), by Facebook, Inc. and its affiliates., licensed under [MIT](https://github.com/facebook/react/blob/master/LICENSE)
* [Capacitor](https://github.com/ionic-team/capacitor), by Drifty Co., licensed under [MIT](https://github.com/ionic-team/capacitor/blob/main/LICENSE)
* [@capacitor-community/barcode-scanner](https://github.com/capacitor-community/barcode-scanner), by capacitor-community, licensed under [MIT](https://github.com/capacitor-community/barcode-scanner/blob/main/LICENSE)
* [ionic-framework](https://github.com/ionic-team/ionic-framework), by Drifty Co., licensed under [MIT](https://github.com/ionic-team/ionic-framework/blob/master/LICENSE)
* [@material-ui/styles](https://github.com/mui-org/material-ui), by Call-Em-All, licensed under [MIT](https://github.com/mui-org/material-ui/blob/latest/LICENSE)
* [classnames](https://github.com/JedWatson/classnames), by Jed Watson, licensed under [MIT](https://github.com/JedWatson/classnames/blob/master/LICENSE)
* [esp-idf-provisioning-ios](https://github.com/espressif/esp-idf-provisioning-ios), by Espressif, licensed under [Apache 2.0](https://github.com/espressif/esp-idf-provisioning-ios/blob/master/LICENSE)
* [esp-idf-provisioning-android](https://github.com/espressif/esp-idf-provisioning-android), by Espressif, licensed under [Apache 2.0](https://github.com/espressif/esp-idf-provisioning-android/blob/master/LICENSE)
