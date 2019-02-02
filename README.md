# Homebridge Vizio Remote
A Homebridge plugin that enables HomeKit remote control support for Vizio SmartCast devices

Features of this package include to ability to:
- Toggle the device power
- Control the device media
- Adjust the device volume
- Switch the device inputs
- Navigate the device menus


## Installation
1) Visit the [Homebridge repository](https://github.com/nfarina/homebridge) and follow the instructions.
2) Clone this repository by running the following command:
````
git clone https://github.com/bms2993/homebridge-vizio-remote
````
3) Change the current directory to this repository by running the following command:
````
cd ./homebridge-vizio-remote
````
4) Install this package by running the following command:
````
npm install
````

## Configuration
1) To configure this package, the IP address of the device must be known. This can be found with either the SmartCast app or on the device menu.
2) To pair the device with Homebridge, run the following command:
````
node node_modules/homebridge-vizio-remote/setup.js
````
3) Enter the IP address of the device when prompted.
4) Enter the PIN code that the device shows on the screen. 
5) Once the device pairing process is complete, take note of the device access token.
6) In the Homebridge configuration file, add the following:
````
"accessories": [
    {
        "accessory": "homebridge-vizio-remote",
        "name": "DEVICE NAME",
        "token": "DEVICE ACCESS TOKEN",
        "address": "DEVICE IP ADDRESS"
    }
]
````

## Attribution
This package is a fork of [`homebridge-vizio`](https://github.com/johnwickham/homebridge-vizio) by [John Wickham](https://github.com/johnwickham) which is turn based on [`vizio-smart-cast`](https://github.com/heathbar/vizio-smart-cast/blob/master/README.md) by [Heath Paddock](https://github.com/heathbar). Thank you to everyone involved.
