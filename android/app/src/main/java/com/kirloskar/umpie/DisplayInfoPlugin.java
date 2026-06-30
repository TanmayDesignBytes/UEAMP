package com.kirloskar.umpie;

import android.os.Build;
import android.view.Display;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.LinkedHashSet;
import java.util.Set;

@CapacitorPlugin(name = "DisplayInfo")
public class DisplayInfoPlugin extends Plugin {

    @PluginMethod
    public void getRefreshRate(PluginCall call) {
        Display display = null;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            display = getActivity().getDisplay();
        } else {
            display = getActivity().getWindowManager().getDefaultDisplay();
        }

        if (display == null) {
            call.reject("Display is not available");
            return;
        }

        JSObject result = new JSObject();
        result.put("refreshRate", display.getRefreshRate());

        JSArray supportedRates = new JSArray();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Set<Float> uniqueRates = new LinkedHashSet<>();
            for (Display.Mode mode : display.getSupportedModes()) {
                uniqueRates.add(mode.getRefreshRate());
            }

            for (Float rate : uniqueRates) {
                supportedRates.put(rate);
            }

            Display.Mode activeMode = display.getMode();
            if (activeMode != null) {
                result.put("activeModeRefreshRate", activeMode.getRefreshRate());
                result.put("activeModeWidth", activeMode.getPhysicalWidth());
                result.put("activeModeHeight", activeMode.getPhysicalHeight());
            }
        }

        result.put("supportedRefreshRates", supportedRates);
        call.resolve(result);
    }
}
