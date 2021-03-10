# Android Development
Run the following in the root of the Warmtewachter project.
```
    yarn build
```
Followed by:
```
    yarn open-android
```

This will open Android studio for you which can run an android device emulator.
Once you have the emulator running and you apply a change in the code, you'll have to call this in the project root to recompile the android app.
```
    yarn copy-android
```
Then to restart the emulator with the new changes, click on 'Run'.
![Image](./resources/androidstudio_run.png)

To debug the web portion of the application navigate to `chrome://inspect` and wait for your device our emulator instance to appear. Click on `inspect` and a Chrome devtools window will open.

### Common problems
 - In case android studio says you have no configuration available it can mean that you're missing the required sdk version. You install these go to 
 **File > Settings > Appearance & Behaviour > System Settings > Android SDK**.
 Here you can select and download whichever version is required to run the App.

 ### References
 For more info checkout the [Android Studio Docs](https://developer.android.com/training/basics/firstapp/running-app).
