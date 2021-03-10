# iOS Development
Run the following in the root of the Warmtewachter project.
```
    yarn build
```
Followed by:
```
    yarn open-ios
```

This will open xCode for you which can run an iOS device simulator.
Once you have the simulator running and you apply a change in the code, you'll have to call this in the project root to recompile the iOS app.
```
    yarn copy-ios
```

To debug the web portion of the application open up safari. Then under `Develop` you should be able to find your device holding a list of all the browsers windows available. Click the instance belonging to your application and a Safari devtools window will pop-up.

### Common problems
 - In case android studio says you have no configuration available it can mean that you're missing the required sdk version. You install these go to 
 **File > Settings > Appearance & Behaviour > System Settings > Android SDK**.
 Here you can select and download whichever version is required to run the App.

 ### References
 For more info checkout the [Android Studio Docs](https://developer.android.com/training/basics/firstapp/running-app).
