# Warmtewachter
The WarmteWachter app is used to help clients successfully install varying sets of sensors.

## Getting Started
Contains the follow contents;
 1. [Prerequisites](#Prerequisites) 
 2. [Installing dependencies](#installing-dependencies)
 3. [Running and Debugging](#running-and-debugging)
    - [Native Debugging](#native-debugging)
 4. [Scripts](#scripts)

### Prerequisites
 - Yarn installed.
 - Android Studio installed.
 - Xcode installed.

### Installing dependencies
The app is build using Ionic hence you need to;
```
    yarn add global @ionic/cli
```
Next up, fill up your `node_modules` using;
```
    yarn
```

### Running and Debugging
For simple and quick changes that do not depend on native functions you can simply use this to debug on localhost in your preferred browser.
```
    yarn start
```
You can also create a production build of the web portion using:
```
    yarn build
```

#### Native debugging
When you are dependend on native functions you need to do a few steps for the respective operating system.

For more info see:
 - [Android Development](./docs/android.md)
 - [iOS Development](./docs/ios.md)

### Scripts
Above you've already been introduced to a couple of the available scripts for this project.

For a complete list of all the available scripts see [Available Scripts](./docs/scripts.md)