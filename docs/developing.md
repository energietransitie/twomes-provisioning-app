# Developing

## Getting Started
Contains the follow contents;
 1. [Prerequisites](#Prerequisites) 
 2. [Installing dependencies](#installing-dependencies)
 3. [Running and Debugging](#running-and-debugging)
    - [Native Debugging](#native-debugging)
 4. [Scripts](#scripts)

### Prerequisites
Before you can start developing, you should have:

* [Yarn](https://classic.yarnpkg.com/) installed; on Windows:
  * [Node.js](https://nodejs.org/en/) installed;
  * [Yarn](https://classic.yarnpkg.com/latest.msi) installed;
* [Android Studio](https://developer.android.com/studio) installed.
* Xcode installed;
* this GitHub reposotory cloned.

### Installing dependencies
The app is build using Ionic hence you need to open a command window and enter;
```shell
yarn add global @ionic/cli
```
Next up, fill up your `node_modules` using;
```shell
yarn
```

### Running and Debugging
For simple and quick changes that do not depend on native functions you can simply use this to debug on localhost in your preferred browser.
```shell
yarn start
```
You can also create a production build of the web portion using:
```shell
yarn build
```

#### Native debugging
When you are dependend on native functions you need to do a few steps for the respective operating system.

For more info see:
 - [Android Development](./android.md)
 - [iOS Development](./ios.md)

### Scripts
Above you've already been introduced to a couple of the available scripts for this project.

For a complete list of all the available scripts see [Available Scripts](./docs/scripts.md)
