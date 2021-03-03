# Available Script

The following scripts are available:
 - [yarn start](#yarn-start)
 - [yarn build](#yarn-build)
 - [yarn test](#yarn-test)
 - [yarn eject](#yarn-eject)
 - [yarn resources](#yarn-resources)
 - [yarn build-android](#yarn-build-android)
 - [yarn copy-android](#yarn-copy-android)
 - [yarn open-android](#yarn-open-android)
 - [yarn sync-android](#yarn-sync-android)
 - [yarn build-ios](#yarn-build-ios)
 - [yarn copy-ios](#yarn-copy-ios)
 - [yarn open-ios](#yarn-open-ios)
 - [yarn sync-ios](#yarn-sync-ios)
 - [yarn eslint](#yarn-eslint)
 - [yarn eslint-fix](#yarn-eslint-fix)
 - [yarn typescript](#yarn-typescript)

## yarn start
```
yarn start
```
Creates a development build of the (web)application and makes it available on [localhost:3000](localhost:3000). A webpack-dev-server is ran with hot-reloading, meaning every change in the web application will cause a rebuild and a reload of the browser window containing the changes. Subsequently the active process will report any errors and warnings in the terminal window.

Calling `yarn start` will trigger the yarn `prestart` hook which will install and update any missing or outdated dependencies.

## yarn build
```
yarn build
```
Creates a production build of the (web)application and outputs it inside the `/build` folder.

## yarn test
```
yarn test
```
This will run all available jest tests.

## yarn eject
```
yarn eject
```
[Ionic-react](https://ionicframework.com/docs/react) uses [create-react-app](https://create-react-app.dev/) behind the scenes. Calling `eject` will cause the config files such as `webpack.config.js` to be ejected so they can be altered.

**Note!** Ejecting the config files is a **PERMANENT** action. Once ejected it **cannot be undone**.

## yarn resources
```
yarn resources
```

_Honestly no idea yet what this does._

One thing it does is copy a few resources, such as the logo and splashcreen, to their respective places inside the native builds.

## yarn build-android
```
yarn build-android
```
Creates a complete production build for Android. This will either create or update the existing `/android` folder. In most case this command is only required when building the android version for the first time.

## yarn copy-android
```
yarn copy-android
```
Updates the existing Android build in the `/android` folder. This command is significantly faster than `yarn build-android`. It is highely recommended to use this command when wanting to apply changes.

## yarn open-android
```
yarn open-android
```
This will launch Android Studio and essentially just open the contents of the `/android` folder.

## yarn sync-android
```
yarn sync-android
```
Doing this will make [capacitor](https://capacitorjs.com/docs) aware of any added, updated or removed plugins for android.

## yarn build-ios
```
yarn build-ios
```
Creates a complete production build for iOS. This will either create or update the existing `/ios` folder. In most case this command is only required when building the android version for the first time.

## yarn copy-ios
```
yarn copy-ios
```
Updates the existing iOS build in the `/ios` folder. This command is significantly faster than `yarn build-ios`. It is highely recommended to use this command when wanting to apply changes.

## yarn open-ios
```
yarn open-ios
```
This will launch Xcode and essentially just open the contents of the `/ios` folder.

## yarn sync-ios
```
yarn sync-ios
```
Doing this will make [capacitor](https://capacitorjs.com/docs) aware of any added, updated or removed plugins for iOS.

## yarn eslint
```
yarn eslint
```
Runs the linting process configured in `.eslintrc.js`. Any errors and warnings will be reported in the terminal window.

## yarn eslint-fix
```
yarn eslint-fix
```
Runs the linting process configured in `.eslintrc.js` and additionally fixes any auto-fixable errors and warnings;

## yarn typescript
```
yarn typescript
```
This will run the Typescript compiler reporting any errors and warnings in the terminal window without outputting any files.