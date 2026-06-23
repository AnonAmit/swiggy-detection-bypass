// ╔══════════════════════════════════════════════════════════════╗
// ║   SWIGGY DEVICE IDENTITY SPOOFER + SECURITY BYPASS         ║
// ║   Usage: frida -U -f in.swiggy.android -l frida_swiggy_bypass.js ║
// ║                                                              ║
// ║   → Edit DEVICE_CONFIG below to become a "new device"       ║
// ╚══════════════════════════════════════════════════════════════╝

// ── Set to true to automatically generate a random, realistic device every time you run it ──
var AUTO_RANDOMIZE = true;

// ██          CHANGE THESE VALUES TO SPOOF A NEW DEVICE        ██
var DEVICE_CONFIG = {
    // ── Android Device ID (16 hex chars, Settings.Secure.ANDROID_ID)
    ANDROID_ID:       "a1b2c3d4e5f60001",

    // ── IMEI (15 digits)
    IMEI:             "358743091234561",

    // ── Phone number (can be anything)
    PHONE_NUMBER:     "+919876543210",

    // ── SIM Serial Number (ICCID, 19-20 digits)
    SIM_SERIAL:       "8991101200003204510",

    // ── Subscriber ID (IMSI, 15 digits)
    IMSI:             "404451234567890",

    // ── WiFi MAC Address
    WIFI_MAC:         "02:00:00:a1:b2:c3",

    // ── Build / Device Info
    MODEL:            "Pixel 6",
    MANUFACTURER:     "Google",
    BRAND:            "google",
    PRODUCT:          "oriole",
    DEVICE:           "oriole",
    HARDWARE:         "gs101",
    BOARD:            "oriole",
    FINGERPRINT:      "google/oriole/oriole:13/TP1A.221005.002/9012097:user/release-keys",
    BUILD_ID:         "TP1A.221005.002",
    INCREMENTAL:      "9012097",
    DISPLAY:          "TP1A.221005.002",

    // ── Google Advertising ID (UUID format)
    GAID:             "38400000-8cf0-11bd-b23e-10b96e40001a",

    // ── Swiggy Internal IDs
    SWIGGY_AD_ID:      "aabbccdd1122334455667788aabbccddaabbccdd11223344aabbccdd11223344",
    JUSPAY_ANDROID_ID: "11111111-2222-3333-4444-555566667777",
    JUSPAY_DEVICE_ID:  "aaaabbbb-cccc-dddd-eeee-ffff00001111",
};

// ██████████████████████████████████████████████████████████████
// ██              DO NOT EDIT BELOW THIS LINE                  ██
// ██████████████████████████████████████████████████████████████

Java.perform(function () {
    // ── Auto Randomizer Logic ──
    if (AUTO_RANDOMIZE) {
        // Use Date.now() to ensure randomness
        var seed = Date.now();
        var randHex = function(len) {
            var r = ''; for (var i = 0; i < len; i++) {
                seed = (seed * 9301 + 49297) % 233280;
                var rand = seed / 233280;
                r += '0123456789abcdef'.charAt(Math.floor(rand * 16)); 
            }
            return r;
        };
        var randNum = function(len) {
            var r = ''; for (var i = 0; i < len; i++) {
                seed = (seed * 9301 + 49297) % 233280;
                var rand = seed / 233280;
                r += '0123456789'.charAt(Math.floor(rand * 10)); 
            }
            return r;
        };
        var randUUID = function() {
            return randHex(8) + '-' + randHex(4) + '-4' + randHex(3) + '-a' + randHex(3) + '-' + randHex(12);
        };

        var realisticDevices = [
            { MODEL: "Pixel 6", MANUFACTURER: "Google", BRAND: "google", PRODUCT: "oriole", DEVICE: "oriole", HARDWARE: "gs101", BOARD: "oriole", FINGERPRINT: "google/oriole/oriole:13/TP1A.221005.002/9012097:user/release-keys", BUILD_ID: "TP1A.221005.002", INCREMENTAL: "9012097", DISPLAY: "TP1A.221005.002" },
            { MODEL: "Pixel 7 Pro", MANUFACTURER: "Google", BRAND: "google", PRODUCT: "cheetah", DEVICE: "cheetah", HARDWARE: "gs201", BOARD: "cheetah", FINGERPRINT: "google/cheetah/cheetah:13/TD1A.220804.031.A2/9071060:user/release-keys", BUILD_ID: "TD1A.220804.031.A2", INCREMENTAL: "9071060", DISPLAY: "TD1A.220804.031.A2" },
            { MODEL: "SM-G998B", MANUFACTURER: "samsung", BRAND: "samsung", PRODUCT: "p3sxq", DEVICE: "p3s", HARDWARE: "exynos2100", BOARD: "exynos2100", FINGERPRINT: "samsung/p3sxq/p3s:12/SP1A.210812.016/G998BXXU4BVB1:user/release-keys", BUILD_ID: "SP1A.210812.016", INCREMENTAL: "G998BXXU4BVB1", DISPLAY: "SP1A.210812.016.G998BXXU4BVB1" },
            { MODEL: "SM-S908B", MANUFACTURER: "samsung", BRAND: "samsung", PRODUCT: "b0s", DEVICE: "b0s", HARDWARE: "s5e9925", BOARD: "s5e9925", FINGERPRINT: "samsung/b0s/b0s:12/SP1A.210812.016/S908BXXU1AVBF:user/release-keys", BUILD_ID: "SP1A.210812.016", INCREMENTAL: "S908BXXU1AVBF", DISPLAY: "SP1A.210812.016.S908BXXU1AVBF" },
            { MODEL: "OnePlus 9 Pro", MANUFACTURER: "OnePlus", BRAND: "OnePlus", PRODUCT: "OnePlus9Pro", DEVICE: "OnePlus9Pro", HARDWARE: "qcom", BOARD: "lahaina", FINGERPRINT: "OnePlus/OnePlus9Pro/OnePlus9Pro:12/SKQ1.210216.001/R.202202231201:user/release-keys", BUILD_ID: "SKQ1.210216.001", INCREMENTAL: "R.202202231201", DISPLAY: "SKQ1.210216.001" },
            { MODEL: "M2101K6G", MANUFACTURER: "Xiaomi", BRAND: "Redmi", PRODUCT: "sweet", DEVICE: "sweet", HARDWARE: "qcom", BOARD: "sweet", FINGERPRINT: "Redmi/sweet/sweet:11/RKQ1.200826.002/V12.5.1.0.RKFMIXM:user/release-keys", BUILD_ID: "RKQ1.200826.002", INCREMENTAL: "V12.5.1.0.RKFMIXM", DISPLAY: "RKQ1.200826.002" }
        ];

        var dev = realisticDevices[Math.floor(Math.random() * realisticDevices.length)];

        DEVICE_CONFIG = {
            ANDROID_ID:       randHex(16),
            IMEI:             "35" + randNum(13),
            PHONE_NUMBER:     "+919" + randNum(9),
            SIM_SERIAL:       "8991" + randNum(15),
            IMSI:             "404" + randNum(12),
            WIFI_MAC:         "02:00:00:" + randHex(2) + ":" + randHex(2) + ":" + randHex(2),
            
            MODEL:            dev.MODEL,
            MANUFACTURER:     dev.MANUFACTURER,
            BRAND:            dev.BRAND,
            PRODUCT:          dev.PRODUCT,
            DEVICE:           dev.DEVICE,
            HARDWARE:         dev.HARDWARE,
            BOARD:            dev.BOARD,
            FINGERPRINT:      dev.FINGERPRINT,
            BUILD_ID:         dev.BUILD_ID,
            INCREMENTAL:      dev.INCREMENTAL,
            DISPLAY:          dev.DISPLAY,

            GAID:              randUUID(),
            SWIGGY_AD_ID:      randHex(64),
            JUSPAY_ANDROID_ID: randUUID(),
            JUSPAY_DEVICE_ID:  randUUID()
        };
    }

    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  Swiggy Device Spoofer v2 Loading...  ║");
    console.log("╚════════════════════════════════════════╝");
    console.log("[DEVICE] Spoofing as: " + DEVICE_CONFIG.MODEL + " | ID: " + DEVICE_CONFIG.ANDROID_ID);

    var blockingActive = false;

    // ════════════════════════════════════════════════════════════
    // SECTION A: SECURITY BYPASS (same as before)
    // ════════════════════════════════════════════════════════════

    try {
        var SHV = Java.use("in.swiggy.android.systemcheck.tools.SystemHealthValidator");
        SHV.a.overload().implementation = function () { return false; };
        console.log("[+] [SEC] SystemHealthValidator bypassed ✓");
    } catch (e) { console.log("[-] [SEC] " + e); }

    try {
        var SHV2 = Java.use("in.swiggy.android.systemcheck.tools.SystemHealthValidator");
        SHV2.checkSystemStatus.implementation = function () { return false; };
        console.log("[+] [SEC] checkSystemStatus bypassed ✓");
    } catch (e) {}

    try {
        var Activity = Java.use("android.app.Activity");
        Activity.startActivity.overload("android.content.Intent").implementation = function (intent) {
            try {
                var cn = intent.getComponent();
                if (cn && cn.getClassName().indexOf("systemcheck") !== -1) {
                    console.log("[BLOCKED] SystemCheckActivity start blocked");
                    blockingActive = true;
                    return;
                }
            } catch (ex) {}
            return this.startActivity(intent);
        };
        Activity.startActivity.overload("android.content.Intent", "android.os.Bundle").implementation = function (intent, opts) {
            try {
                var cn = intent.getComponent();
                if (cn && cn.getClassName().indexOf("systemcheck") !== -1) {
                    blockingActive = true;
                    return;
                }
            } catch (ex) {}
            return this.startActivity(intent, opts);
        };
        console.log("[+] [SEC] startActivity intercept ✓");
    } catch (e) { console.log("[-] [SEC] startActivity: " + e); }

    try {
        var Activity2 = Java.use("android.app.Activity");
        Activity2.finishAffinity.implementation = function () {
            if (blockingActive) {
                console.log("[BLOCKED] finishAffinity suppressed");
                blockingActive = false;
                return;
            }
            return this.finishAffinity();
        };
        console.log("[+] [SEC] finishAffinity guard ✓");
    } catch (e) {}

    try {
        var SCA = Java.use("in.swiggy.android.systemcheck.ui.SystemCheckActivity");
        var DaggerACA = Java.use("dagger.android.support.DaggerAppCompatActivity");
        SCA.onCreate.overload("android.os.Bundle").implementation = function (bundle) {
            DaggerACA.onCreate.call(this, bundle);
            this.finish();
        };
        console.log("[+] [SEC] SystemCheckActivity safety net ✓");
    } catch (e) {}

    try {
        var SettingsGlobal = Java.use("android.provider.Settings$Global");
        var devKeys = ["development_settings_enabled","adb_enabled","mock_location","mock_location_mode","enable_gpu_debug_layers"];
        SettingsGlobal.getInt.overload("android.content.ContentResolver","java.lang.String","int").implementation = function (cr, name, def) {
            if (devKeys.indexOf(name) !== -1) return 0;
            return this.getInt(cr, name, def);
        };
        SettingsGlobal.getInt.overload("android.content.ContentResolver","java.lang.String").implementation = function (cr, name) {
            if (devKeys.indexOf(name) !== -1) return 0;
            return this.getInt(cr, name);
        };
        console.log("[+] [SEC] Settings.Global (dev options) ✓");
    } catch (e) { console.log("[-] [SEC] Settings.Global: " + e); }

    try {
        var SettingsSecure = Java.use("android.provider.Settings$Secure");
        var secureKeys = ["adb_enabled","mock_location","install_non_market_apps"];
        SettingsSecure.getInt.overload("android.content.ContentResolver","java.lang.String","int").implementation = function (cr, name, def) {
            if (secureKeys.indexOf(name) !== -1) return 0;
            return this.getInt(cr, name, def);
        };
        SettingsSecure.getInt.overload("android.content.ContentResolver","java.lang.String").implementation = function (cr, name) {
            if (secureKeys.indexOf(name) !== -1) return 0;
            return this.getInt(cr, name);
        };
        console.log("[+] [SEC] Settings.Secure (adb) ✓");
    } catch (e) { console.log("[-] [SEC] Settings.Secure: " + e); }

    try {
        var Debug = Java.use("android.os.Debug");
        Debug.isDebuggerConnected.implementation = function () { return false; };
        console.log("[+] [SEC] Debug.isDebuggerConnected ✓");
    } catch (e) {}

    // ════════════════════════════════════════════════════════════
    // SECTION B: DEVICE IDENTITY SPOOFING
    // ════════════════════════════════════════════════════════════

    // ── B1. Build properties ─────────────────────────────────────
    try {
        var Build = Java.use("android.os.Build");
        Build.MODEL.value        = DEVICE_CONFIG.MODEL;
        Build.MANUFACTURER.value = DEVICE_CONFIG.MANUFACTURER;
        Build.BRAND.value        = DEVICE_CONFIG.BRAND;
        Build.PRODUCT.value      = DEVICE_CONFIG.PRODUCT;
        Build.DEVICE.value       = DEVICE_CONFIG.DEVICE;
        Build.HARDWARE.value     = DEVICE_CONFIG.HARDWARE;
        Build.BOARD.value        = DEVICE_CONFIG.BOARD;
        Build.FINGERPRINT.value  = DEVICE_CONFIG.FINGERPRINT;
        Build.ID.value           = DEVICE_CONFIG.BUILD_ID;
        Build.DISPLAY.value      = DEVICE_CONFIG.DISPLAY;
        Build.TYPE.value         = "user";
        Build.TAGS.value         = "release-keys";
        console.log("[+] [ID] Build properties spoofed ✓ → " + DEVICE_CONFIG.MODEL);
    } catch (e) { console.log("[-] [ID] Build: " + e); }

    try {
        var BuildVersion = Java.use("android.os.Build$VERSION");
        console.log("[+] [ID] Build.VERSION available");
    } catch (e) {}

    // ── B2. Android ID ────────────────────────────────────────────
    try {
        var SettingsSecure2 = Java.use("android.provider.Settings$Secure");
        var getString_orig = SettingsSecure2.getString.overload("android.content.ContentResolver", "java.lang.String");
        getString_orig.implementation = function (cr, name) {
            if (name === "android_id") {
                console.log("[SPOOF] Settings.Secure.getString(android_id) → " + DEVICE_CONFIG.ANDROID_ID);
                return DEVICE_CONFIG.ANDROID_ID;
            }
            return this.getString(cr, name);
        };
        console.log("[+] [ID] Android ID spoofed ✓ → " + DEVICE_CONFIG.ANDROID_ID);
    } catch (e) { console.log("[-] [ID] Android ID: " + e); }

    // ── B3. TelephonyManager: IMEI / IMSI / Phone / SIM ──────────
    try {
        var TelMgr = Java.use("android.telephony.TelephonyManager");

        // IMEI (getDeviceId)
        try {
            TelMgr.getDeviceId.overload().implementation = function () {
                console.log("[SPOOF] getDeviceId → " + DEVICE_CONFIG.IMEI);
                return DEVICE_CONFIG.IMEI;
            };
        } catch (e) {}
        try {
            TelMgr.getDeviceId.overload("int").implementation = function (slot) {
                return DEVICE_CONFIG.IMEI;
            };
        } catch (e) {}

        // getImei (API 26+)
        try {
            TelMgr.getImei.overload().implementation = function () {
                console.log("[SPOOF] getImei → " + DEVICE_CONFIG.IMEI);
                return DEVICE_CONFIG.IMEI;
            };
        } catch (e) {}
        try {
            TelMgr.getImei.overload("int").implementation = function (slot) {
                return DEVICE_CONFIG.IMEI;
            };
        } catch (e) {}

        // Phone number
        try {
            TelMgr.getLine1Number.overload().implementation = function () {
                return DEVICE_CONFIG.PHONE_NUMBER;
            };
        } catch (e) {}

        // IMSI
        try {
            TelMgr.getSubscriberId.overload().implementation = function () {
                return DEVICE_CONFIG.IMSI;
            };
        } catch (e) {}

        // SIM Serial
        try {
            TelMgr.getSimSerialNumber.overload().implementation = function () {
                return DEVICE_CONFIG.SIM_SERIAL;
            };
        } catch (e) {}

        console.log("[+] [ID] TelephonyManager (IMEI/IMSI/SIM) spoofed ✓");
    } catch (e) { console.log("[-] [ID] TelephonyManager: " + e); }

    // ── B4. WiFi MAC Address ──────────────────────────────────────
    try {
        var WifiInfo = Java.use("android.net.wifi.WifiInfo");
        WifiInfo.getMacAddress.implementation = function () {
            console.log("[SPOOF] getMacAddress → " + DEVICE_CONFIG.WIFI_MAC);
            return DEVICE_CONFIG.WIFI_MAC;
        };
        console.log("[+] [ID] WiFi MAC spoofed ✓ → " + DEVICE_CONFIG.WIFI_MAC);
    } catch (e) { console.log("[-] [ID] WiFi MAC: " + e); }

    // ── B5. Google Advertising ID ────────────────────────────────
    try {
        var AdvertisingIdClient = Java.use("com.google.android.gms.ads.identifier.AdvertisingIdClient");
        AdvertisingIdClient.getAdvertisingIdInfo.implementation = function (ctx) {
            var info = this.getAdvertisingIdInfo(ctx);
            console.log("[SPOOF] AdvertisingId (attempt)");
            return info;
        };
        console.log("[+] [ID] AdvertisingIdClient hook ✓");
    } catch (e) { console.log("[-] [ID] AdvertisingId: " + e); }

    try {
        var AdInfo = Java.use("com.google.android.gms.ads.identifier.AdvertisingIdClient$Info");
        AdInfo.getId.implementation = function () {
            console.log("[SPOOF] AdvertisingId.getId → " + DEVICE_CONFIG.GAID);
            return DEVICE_CONFIG.GAID;
        };
        console.log("[+] [ID] AdvertisingIdClient.Info.getId ✓ → " + DEVICE_CONFIG.GAID);
    } catch (e) { console.log("[-] [ID] AdInfo: " + e); }

    // ── B6. SharedPreferences — spoof Swiggy's internal device IDs ────
    // Keys discovered by spy: adId, juspay_android_id, juspay_device_id
    try {
        var SharedPrefs = Java.use("android.app.SharedPreferencesImpl");
        SharedPrefs.getString.overload("java.lang.String", "java.lang.String").implementation = function (key, def) {

            // ── Spoof Swiggy internal tracking IDs ──
            if (key === "adId") {
                console.log("[SPOOF] SharedPrefs adId → " + DEVICE_CONFIG.SWIGGY_AD_ID);
                return DEVICE_CONFIG.SWIGGY_AD_ID;
            }
            if (key === "juspay_android_id") {
                console.log("[SPOOF] juspay_android_id → " + DEVICE_CONFIG.JUSPAY_ANDROID_ID);
                return DEVICE_CONFIG.JUSPAY_ANDROID_ID;
            }
            if (key === "juspay_device_id") {
                console.log("[SPOOF] juspay_device_id → " + DEVICE_CONFIG.JUSPAY_DEVICE_ID);
                return DEVICE_CONFIG.JUSPAY_DEVICE_ID;
            }

            return this.getString(key, def);
        };
        console.log("[+] [ID] SharedPrefs spoofer active ✓ (adId + juspay IDs)");
    } catch (e) { console.log("[-] [ID] SharedPrefs: " + e); }

    // ── B7. Also spoof SharedPrefs putString to prevent overwrite ─────
    try {
        var SharedPrefs2 = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
        SharedPrefs2.putString.overload("java.lang.String", "java.lang.String").implementation = function (key, value) {
            // Block Swiggy from overwriting our spoofed IDs
            if (key === "adId" || key === "juspay_android_id" || key === "juspay_device_id") {
                console.log("[BLOCK WRITE] SharedPrefs.putString('" + key + "') blocked → keeping spoofed value");
                return this; // return editor without saving
            }
            return this.putString(key, value);
        };
        console.log("[+] [ID] SharedPrefs write-block active ✓");
    } catch (e) { console.log("[-] [ID] SharedPrefs write-block: " + e); }

    console.log("\n╔══════════════════════════════════════════════════════╗");
    console.log("║  ✅ SWIGGY DEVICE SPOOFER ACTIVE                     ║");
    console.log("╠══════════════════════════════════════════════════════╣");
    console.log("║  Model:      " + DEVICE_CONFIG.MODEL.padEnd(38) + "║");
    console.log("║  Android ID: " + DEVICE_CONFIG.ANDROID_ID.padEnd(38) + "║");
    console.log("║  IMEI:       " + DEVICE_CONFIG.IMEI.padEnd(38) + "║");
    console.log("║  GAID:       " + DEVICE_CONFIG.GAID.substring(0,38).padEnd(38) + "║");
    console.log("║  Swiggy adId:" + DEVICE_CONFIG.SWIGGY_AD_ID.substring(0,38).padEnd(38) + "║");
    console.log("║  Juspay ID:  " + DEVICE_CONFIG.JUSPAY_DEVICE_ID.padEnd(38) + "║");
    console.log("╚══════════════════════════════════════════════════════╝\n");
});
