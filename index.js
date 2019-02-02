var vizio_smart_cast_module = require('vizio-smart-cast');
var accessory, service, characteristic;

module.exports = function(homebridge)
{
        service = homebridge.hap.Service;
        characteristic = homebridge.hap.Characteristic;
        homebridge.registerAccessory('homebridge-vizio', 'VizioDisplay', homebridge-vizio);
}

function homebridge_vizio(log, config, api)
{
        this.log = log;
        this.config = config;
        this.accessories = [];
        this.name = config.name;

        this.log("Connecting to Device...");
        this.address = config.address;
        this.token = config.token;
        this.device = new vizio_smart_cast_module(this.address);
        this.device.pairing.useAuthToken(this.token);

        this.log("Registering Device Service...");
        var device_service = new service.Television(this.name);
        device_service
                .setCharacteristic(characteristic.ConfiguredName, this.name);
        device_service
                .setCharacteristic(characteristic.SleepDiscoveryMode, characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE);
        device_service
                .getCharacteristic(characteristic.Active)
                .on('get', this.get_power_state.bind(this))
                .on('set', this.set_power_state.bind(this));

        this.log("Registering Volume Service...");
        var volume_service = new service.TelevisionSpeaker(this.name + ' Volume');
        volume_service
                .setCharacteristic(characteristic.Active, characteristic.Active.ACTIVE)
                .setCharacteristic(characteristic.VolumeControlType, characteristic.VolumeControlType.ABSOLUTE);
        volume_service
                .getCharacteristic(characteristic.VolumeSelector)
                .on
                (
                        'set', (state, callback) =>
                        {
                                this.set_volume_state(state, callback);
                        }
                );
        device_service.addLinkedService(volume_service);

        this.log("Registering Key Service...");
        device_service
                .getCharacteristic(characteristic.RemoteKey)
                .on('set', this.set_key_state.bind(this));

        this.service = [device_service, volume_service];
}

homebridge_vizio.prototype.get_power_state = function(callback)
{
        this.log("Getting Device Power State...");
        this.device.power.currentMode().then
        (
                (result) =>
                {
                        callback(null, result.ITEMS[0].VALUE);
                }
        );
}

homebridge_vizio.prototype.set_power_state = function(state, callback)
{
        this.log("Setting Device Power State...");
        var power_promise;
        if (state == 1)
        {
                power_promise = this.device.control.power.on();
        }
        else
        {
                power_promise = this.device.control.power.off();
        }
        callback();
}

homebridge_vizio.prototype.set_volume_state = function(state, callback)
{
        this.log("Setting Volume State...");
        var volume_promise;
        if (state == 0)
        {
                volume_promise = this.device.control.volume.up();
        }
        else
        {
                volume_promise = this.device.control.volume.down();
        }
        callback();
}

homebridge_vizio.prototype.set_key_state = function(state, callback)
{
        this.log("Setting key state...");
        var key_promise;
        switch (state)
        {
                case characteristic.RemoteKey.ARROW_UP:
                        key_promise = this.device.control.navigate.up();
                        break;
                case characteristic.RemoteKey.ARROW_DOWN:
                        key_promise = this.device.control.navigate.down();
                        break;
                case characteristic.RemoteKey.ARROW_LEFT:
                        key_promise = this.device.control.navigate.left();
                        break;
                case characteristic.RemoteKey.ARROW_RIGHT:
                        key_promise = this.device.control.navigate.right();
                        break;
                case characteristic.RemoteKey.SELECT:
                        key_promise = this.device.control.navigate.ok();
                        break;
                case characteristic.RemoteKey.BACK:
                        key_promise = this.device.control.navigate.back();
                        break;
                case characteristic.RemoteKey.EXIT:
                        key_promise = this.device.control.navigate.exit();
                        break;
                case characteristic.RemoteKey.PLAY_PAUSE:
                        key_promise = this.device.control.media.play();
                        break;
                case characteristic.RemoteKey.INFORMATION:
                        key_promise = this.device.control.info();
                        break;
        }
        callback();
}

homebridge_vizio.prototype.getServices = function()
{
        return this.service;
}
