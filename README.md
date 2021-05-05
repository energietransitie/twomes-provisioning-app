# Twomes WarmteWachter
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
This repository contains the source code for the WarmteWachter App for both Android and iOS. The WarmteWachter App allows a user, by scanning a QR Code, to setup and configure a Twomes Planet. Presented with device specific instructions that the user is asked to follow the app proceeds to connect with said device and once connected scan for available networks. The user is asked to select their home network from the list of available networks and supply the password for that network. If everything has been entered correctly the user is then notified the setup was complete and succesful and can choose to configure the next device.

## Prerequisites
To deploy and use the WarmteWachter app you need to be in the possesion of atleast one Twomes Planet.

## Deploying
As we are currently stil in development, to use the official production version you need to contact us using the following emailaddress; `marco.prins@windesheim.nl`. Please include the Apple ID or Google Account that's being used on the device you wish to install the WarmteWachter app.

Eventually the production version of the app can be downloaded directly from the Apple App Store or Google Play Store depending on your device.

## Developing
For getting started with the development of the WarmteWachter app see [Developing - Getting Started](./docs/developing.md).

## Features
List of features ready and TODOs for future development. Ready:

- [x] Activate your account using a Firebase Dynamic Link
- [x] Scan the QR Code of any of the Twomes Planets.
- [x] Connect to a Twomes Planet using BLE.
- [x] Select your Home Network from a list of available wifi networks for the device. Provide the correct password and the device will be provisioned.

To-do:

- [ ] Present device specific 'Installation Instructions' that have been fetched from the Twomes Backoffice
- [ ] Connect to a Twomes device using SoftAP.
- [ ] Verify Succesful device provisioning with the Twomes Backoffice.
- [ ] All-around non-happy flow coverage
- [ ] All-around usability improvements.

## Status
Project is: _in progress_

## License
This software is available under the [Apache 2.0 license](./LICENSE.md), Copyright 2021 [Research group Energy Transition, Windesheim University of Applied Sciences](https://windesheim.nl/energietransitie) 

## Credits
This software is a collaborative effort of the following students and researchers:
* Henri ter Hofte  ·  [@henriterhofte](https://github.com/henriterhofte)
* Wietske Veneberg  ·  [@WVeneberg](https://github.com/WVeneberg)
* Amicia Smit  ·  [@AmiciaSmit](https://github.com/AmiciaSmit)
* Marco Prins  ·  [@mk-prins](https://github.com/mk-prins)


We use and gratefully aknowlegde the efforts of the makers of the following source code and libraries:

* [Typescript](https://github.com/microsoft/TypeScript), by Microsoft, licensed under [Apache 2.0](https://github.com/microsoft/TypeScript/blob/master/LICENSE.txt)
* [React](https://github.com/facebook/react/), by Facebook, Inc. and its affiliates., licensed under [MIT](https://github.com/facebook/react/blob/master/LICENSE)
* [Capacitor](https://github.com/ionic-team/capacitor), by Drifty Co., licensed under [MIT](https://github.com/ionic-team/capacitor/blob/main/LICENSE)
* [@capacitor-community/barcode-scanner](https://github.com/capacitor-community/barcode-scanner), by capacitor-community, licensed under [MIT](https://github.com/capacitor-community/barcode-scanner/blob/main/LICENSE)
* [ionic-framework](https://github.com/ionic-team/ionic-framework), by Drifty Co., licensed under [MIT](https://github.com/ionic-team/ionic-framework/blob/master/LICENSE)
* [@material-ui/styles](https://github.com/mui-org/material-ui), by Call-Em-All, licensed under [MIT](https://github.com/mui-org/material-ui/blob/latest/LICENSE)
* [classnames](https://github.com/JedWatson/classnames), by Jed Watson, licensed under [MIT](https://github.com/JedWatson/classnames/blob/master/LICENSE)
* [esp-idf-provisioning-ios](https://github.com/espressif/esp-idf-provisioning-ios), by Esspressif, licensed under [Apache 2.0](https://github.com/espressif/esp-idf-provisioning-ios/blob/master/LICENSE)
* [esp-idf-provisioning-android](https://github.com/espressif/esp-idf-provisioning-android), by Esspressif, licensed under [Apache 2.0](https://github.com/espressif/esp-idf-provisioning-android/blob/master/LICENSE)
