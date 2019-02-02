# Homebridge Vizio Remote
![alt text](https://pbs.twimg.com/media/DyYIQnTX4AAVKuV.jpg)
A Homebridge plugin to control your Vizio Smartcast display with added remote support for iOS 12.2

This fork includes TV remote support for iOS 12.2 devices. Newer Vizio TVs may have incompatibilities with `vizio-smart-cast` button mapping. A fix for this is included with updated button maps for newer models (2017-2018).

## Getting Started
You'll need to install [Homebridge](https://github.com/nfarina/homebridge) first:

````
sudo npm install -g homebridge
````

Then, install `homebridge-vizio-remote`:

````
git clone https://github.com/bms2993/homebridge-vizio-remote
sudo npm install -g
````

## Setting Up
To configure `homebridge-vizio-remote`, you'll need to know the LAN IP address or hostname of your display. You can find this in the SmartCast app, or on the display's menu.

**Note**: It is recommended that you use the display's hostname, as it isn't likely to change like it's IP address will. The default hostname appears to be `viziocasttv.local`.

You'll need to pair your display with Homebridge so your display will accept commands to control it. This repository comes with a helpful setup script that walks you through the process. To use it, use:

````
node node_modules/homebridge-vizio-remote/setup.js
````

You'll be asked for the IP address of your display (try using `viziocasttv.local` if you don't know it), then for the PIN code that the display shows on-screen. Then, you'll be shown an "access token"; copy the token, you'll need it in a moment.

## Configuring Homebridge
Homebridge uses a [JSON file](https://github.com/nfarina/homebridge#quick-overview) to determine what accessories are exposed to HomeKit. Add the following entry to your `config.json`:

````
"accessories": [
    {
        "accessory": "VizioDisplay",
        "name": "Whatever Name You Want",
        "token": "YOUR ACCESS TOKEN",
        "address": "YOUR DISPLAY'S IP ADDRESS"
    }
]
````

## Controlling Your Display
Currently, `homebridge-vizio-remote` supports:
- Powering on and off the display
- Pause and play media controls
- Volume up and down controls
- Navigation controls
- Info control

## How It Works
`homebridge-vizio-remote` is based on [`homebridge-vizio`](https://github.com/johnwickham/homebridge-vizio) by [John Wickham](https://github.com/johnwickham) which is in turn based on [`vizio-smart-cast`](https://github.com/heathbar/vizio-smart-cast/blob/master/README.md) by [Heath Paddock](https://github.com/heathbar). Many thanks to everyone involved.
