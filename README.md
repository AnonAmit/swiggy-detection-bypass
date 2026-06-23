# Swiggy Security Bypass & Auto-Randomizer Guide

This guide explains how to bypass Swiggy's security checks (tamper detection, root/adb checks) and spoof device identifiers automatically on any PC using Frida.

---
## Demo
https://github.com/AnonAmit/swiggy-detection-bypass/blob/main/demo.mp4

## Prerequisites (One-time Setup)

You need three things installed on your PC:
1.  **Python 3** (Download from python.org)
2.  **Frida-tools** (Python package)
3.  An Android Emulator (like **MuMu Player**) or a rooted Android phone.

### Step 1: Install Python and Frida
1.  Open Command Prompt or PowerShell.
2.  Install Frida by running:
    ```bash
    pip install frida-tools
    ```
3.  Verify installation:
    ```bash
    frida --version
    ```
    *(Should output something like 17.9.1)*

### Step 2: Prepare the Emulator
1.  Start MuMu Player.
2.  Enable **USB Debugging** (Settings -> Developer Options -> USB Debugging).
3.  Connect ADB to the emulator:
    ```bash
    adb connect 127.0.0.1:7555
    ```
    *(Note: 7555 is the default port for MuMu. LDPlayer uses 5555, BlueStacks uses 5555 or 10000+).*

---

## Running the Bypass

### Step 1: Push Frida-Server to the Device
Frida requires a server component running inside the emulator to inject code.

1.  Find your emulator's CPU architecture:
    ```bash
    adb shell getprop ro.product.cpu.abi
    ```
    *(MuMu is usually `x86_64` or `x86`).*

2.  Download the corresponding `frida-server` from the [Frida Releases Page](https://github.com/frida/frida/releases) (e.g., `frida-server-17.9.1-android-x86_64.xz`).
3.  Extract the `.xz` file using 7-Zip (or similar) so you just have a file named `frida-server`.
4.  Push it to the emulator and make it executable:
    ```bash
    adb push frida-server /data/local/tmp/frida-server
    adb shell "chmod 755 /data/local/tmp/frida-server"
    ```

### Step 2: Start Frida-Server
You must run the server inside the emulator as root.
1.  Run the server in the background:
    ```bash
    adb shell "su -c '/data/local/tmp/frida-server &'"
    ```
2.  Verify it's running by listing processes:
    ```bash
    frida-ps -U
    ```
    *(You should see a list of Android processes).*

### Step 3: Run the Script
1.  Save the bypass script as `frida_swiggy_bypass.js` on your PC.
2.  Ensure Swiggy is **closed** completely (swipe it away from recent apps or run `adb shell am force-stop in.swiggy.android`).
3.  Inject the script using Frida's **spawn mode** (`-f`):
    ```bash
    frida -U -f in.swiggy.android -l frida_swiggy_bypass.js
    ```
4.  **Do not close the terminal window.** Frida must stay attached while you use the app.

---

## How the Script Works

The `frida_swiggy_bypass.js` script handles two main tasks dynamically (without modifying the APK itself):

### 1. Bypassing Security
Swiggy checks for tampering, developer options, and debuggers. The script intercepts these checks in real-time:
*   `SystemHealthValidator.a()` and `checkSystemStatus()` are forced to return `false` (safe).
*   Any attempt to launch the "Security issue identified" screen (`SystemCheckActivity`) is blocked via `startActivity`.
*   System settings queries (like `development_settings_enabled` or `adb_enabled`) are intercepted and always return `0` (off).

### 2. Device Identity Spoofing (Auto-Randomizer)
Swiggy flags devices that create too many accounts ("Too many login attempts"). The script generates a completely new device profile every time it runs.
*   **AUTO_RANDOMIZE = true**: When set to true at the top of the script, it randomly picks a real device profile (e.g., Pixel 6, Galaxy S22) and generates unique identifiers.
*   **What it spoofs:**
    *   `Settings.Secure.ANDROID_ID`
    *   Telephony info (IMEI, IMSI, SIM Serial, Phone Number)
    *   Hardware details (`Build.MODEL`, `Build.FINGERPRINT`, etc.)
    *   Google Advertising ID (GAID)
    *   **Swiggy Internal IDs:** It intercepts `SharedPreferences` to spoof Swiggy's specific tracking IDs (`adId`, `juspay_android_id`, `juspay_device_id`).

Every time you run the `frida -U -f ...` command, Swiggy thinks you just bought a brand new phone and installed the app for the very first time.

# Disclaimer

## Legal Notice

This tool is provided **for educational and authorized testing purposes only**. Users are solely responsible for ensuring their use complies with all applicable laws, regulations, and the terms of service of the applications they interact with.

### Important:

⚠️ **Unauthorized Access**: Using this tool to bypass security measures on applications you do not own or have explicit permission to test may violate:
- Computer Fraud and Abuse Act (CFAA) in the United States
- Computer Misuse Act (CMA) in the United Kingdom
- Similar laws in other jurisdictions

⚠️ **Terms of Service Violation**: Bypassing Swiggy's security checks likely violates their Terms of Service. Unauthorized use may result in:
- Account suspension or permanent ban
- Legal action by the service provider
- Civil and/or criminal liability

⚠️ **Liability**: The developers of this tool are **not responsible** for:
- Unauthorized access to systems or accounts
- Account bans, suspensions, or data loss
- Legal consequences resulting from misuse
- Any damages caused by using this tool

### Authorized Use Only

This tool should only be used:
- On your own devices that you own or control
- With explicit written permission from the application owner
- For legitimate security research or authorized penetration testing
- In a controlled laboratory environment for educational purposes

### No Warranty

This tool is provided "as-is" without any warranty of any kind, express or implied. Users assume all risk and responsibility for its use.

---

**By using this tool, you acknowledge and agree to this disclaimer.**
