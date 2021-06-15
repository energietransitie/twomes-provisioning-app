// import { EspProvisioning } from 'esp-provisioning-plugin';
import { Plugins } from '@capacitor/core';
import { DeviceTypeResponse } from './ApiService';
import { NetworkService } from './NetworkService';
import { QRCodeJson } from './QRScanService';
import { ProvisioningServiceDev } from './__dev/ProvisioningService';

const { EspProvisioning } = Plugins;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).EspProvisioning = EspProvisioning;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NetworkList = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConnectionStatus = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocationPermissionStatus = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProvisionStatus = any;

export interface Network {
    ssid: string;
    rssi: number; // Maybe a string?
    channel: number;
    passphrase?: string;
    security?: boolean;
}
export interface ESPDevice {
    id: number;
    device: QRCodeJson;
    deviceType: DeviceTypeResponse;
}

class ProvisioningServiceProd {

    private static pendingAction: Promise<unknown>;
    private static espDevice: ESPDevice;
    private static networkList: NetworkList;
    private static network: Network;

    public static getPendingAction(): Promise<unknown> {
        return this.pendingAction;
    }

    public static requestLocationPermissions(): Promise<unknown> {
        this.pendingAction = EspProvisioning.requestLocationPermissions();
        return this.pendingAction;
    }

    public static async checkLocationPermissions(): Promise<LocationPermissionStatus> {
        this.pendingAction = EspProvisioning.checkLocationPermissions();
        return this.pendingAction;
    }

    public static async createEspDevice(qrCodeJson: QRCodeJson, deviceType: DeviceTypeResponse): Promise<ESPDevice> {
        this.pendingAction = EspProvisioning.createESPDevice(qrCodeJson);
        const device = await this.pendingAction;
        this.espDevice = { ...device as {}, deviceType} as ESPDevice;
        return this.espDevice;
    }
    public static getEspDevice(): ESPDevice {
        return this.espDevice;
    }

    public static connectToDevice(): ConnectionStatus {
        this.pendingAction = EspProvisioning.connectToDevice({ device: this.espDevice.id })
        return this.pendingAction;
    }

    public static async scanForNetworks(): Promise<NetworkList> {
        this.pendingAction = EspProvisioning.scanWifiList({ device: this.espDevice.id })
        const result = this.pendingAction;
        this.networkList = result;
        return this.networkList;
    }
    public static getNetworks(): NetworkList {
        return this.networkList;
    }

    public static setNetwork(network: Network): void {
        this.network = network;
    }

    public static getNetwork(): Network {
        return this.network;
    }


    public static async provisionDevice(network: Network): Promise<ProvisionStatus> {
        this.pendingAction = EspProvisioning.provision({
            device: this.espDevice.id,
            ssid: network.ssid,
            passphrase: network.passphrase
        });

        NetworkService.SaveNetwork(network);        
        
        return this.pendingAction;
    }
}

export type IProvisioningService = InstanceType<typeof ProvisioningServiceProd>;

export const ProvisioningService = process.env.NODE_ENV === 'development'
    ? ProvisioningServiceDev
    : ProvisioningServiceProd;
