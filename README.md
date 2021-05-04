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

* Activate your account using a Firebase Dynamic Link
* Scan the QR Code of any of the Twomes Planets.
* Connect to a Twomes Planet using BLE.
* Select your Home Network from a list of available wifi networks for the device. Provide the correct password and the device will be provisioned.

To-do:

* Present device specific 'Installation Instructions' that have been fetched from the Twomes Backoffice
* Connect to a Twomes device using SoftAP.
* Verify Succesful device provisioning with the Twomes Backoffice.
* All-around non-happy flow coverage
* All-around usability improvements.

## Status
Project is: _in progress_

## License
This software is available under the [Apache 2.0 license](./LICENSE.md), Copyright 2021 [Research group Energy Transition, Windesheim University of Applied Sciences](https://windesheim.nl/energietransitie) 

## Credits
This software is a collaborative effort of the following students and researchers:
* <contributor name 1> ·  [@Github_handle_1](https://github.com/<github_handle_1>) ·  Twitter [@Twitter_handle_1](https://twitter.com/<twitter_handle_1>)
* <contributor name 2> ·  [@Github_handle_2](https://github.com/<github_handle_2>) ·  Twitter [@Twitter_handle_2](https://twitter.com/<twitter_handle_2>)
* <contributor name 3> ·  [@Github_handle_3](https://github.com/<github_handle_3>) ·  Twitter [@Twitter_handle_3](https://twitter.com/<twitter_handle_3>)
* etc. 


We use and gratefully aknowlegde the efforts of the makers of the following source code and libraries:

* [library name 1 and version](library 1 URL), by <copyright holder name 1>, licensed under [license 1 name](license1 URL)
* [library name 2 and version](library 2 URL), by <copyright holder name 2>, licensed under [license 2 name](license2 URL)
* [library name 3 and version](library 3 URL), by <copyright holder name 3>, licensed under [license 3 name](license3 URL)
* etc.
