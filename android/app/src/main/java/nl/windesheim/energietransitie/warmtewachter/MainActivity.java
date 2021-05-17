package nl.windesheim.energietransitie.warmtewachter;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.dutchconcepts.capacitor.barcodescanner.BarcodeScanner;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.myapp.plugins.espprovisioning.EspProvisioning;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    FirebaseDynamicLinks.getInstance().getDynamicLink(getIntent()).addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
      @Override
      public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
        Log.i("MARCO_onCreate", "We've got a link!!!");

        Uri deepLink = null;
        if (pendingDynamicLinkData != null) {
          deepLink = pendingDynamicLinkData.getLink();
        }

        if (deepLink != null) {
          Log.i("MARCO_onCreate", "deepLink: " + deepLink.toString());
          bridge.triggerWindowJSEvent("AppOpenedWithDynamicLink", "{ dynamicLink: '" + deepLink.toString() + "'}");
        } else {
          bridge.triggerWindowJSEvent("AppOpenedWithDynamicLink", "{ dynamicLink: 'test'}");
        }
      }
    });

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(BarcodeScanner.class);
      add(EspProvisioning.class);
    }});
  }

  @Override
  public void onStart() {
    super.onStart();

    FirebaseDynamicLinks.getInstance().getDynamicLink(getIntent()).addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
      @Override
      public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
        Log.i("MARCO_onStart", "We've got a link!!!");

        Uri deepLink = null;
        if (pendingDynamicLinkData != null) {
          deepLink = pendingDynamicLinkData.getLink();
        }

        if (deepLink != null) {
          Log.i("MARCO_onStart", "deepLink: " + deepLink.toString());
          bridge.triggerWindowJSEvent("AppOpenedWithDynamicLink", "{ dynamicLink: '" + deepLink.toString() + "'}");
        } else {
          bridge.triggerWindowJSEvent("AppOpenedWithDynamicLink", "{ dynamicLink: 'test'}");
        }
      }
    });
  }

}
