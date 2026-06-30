package com.kirloskar.umpie;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(DisplayInfoPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
