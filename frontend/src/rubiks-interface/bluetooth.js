// Largely based off of https://github.com/wachino/xiaomi-mi-smart-rubik-cube/blob/master/src/helpers/bluetooth.js
// HACKATHON PEOPLE, THIS IS CODE I HAVE PREVIOUSLY WRITTEN!
const SERVICE_UUID = '0000aadb-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000aadc-0000-1000-8000-00805f9b34fb';

const isWebBluetoothSupported = 'bluetooth' in navigator;

const connectToBluetoothDevice = () => {
  return navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID],
    })
    .then((device) =>
      device.gatt.connect().then((server) => {
        window.mdevice = device;
        window.mserver = server;
        return { device, server };
      })
    );
};

const startNotifications = (server) =>
  server.getPrimaryService(SERVICE_UUID).then((service) => {
    window.mservice = service;
    return service.getCharacteristic(CHARACTERISTIC_UUID).then((characteristic) => {
      window.mcharacteristic = characteristic;
      characteristic.startNotifications();
      return characteristic;
    });
  });

const disconnectFromBluetoothDevice = (device) => {
  if (!device || !device.gatt.connected) return Promise.resolve();
  return device.gatt.disconnect();
};

export {isWebBluetoothSupported, connectToBluetoothDevice, startNotifications, disconnectFromBluetoothDevice};