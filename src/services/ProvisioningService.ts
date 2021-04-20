// import { EspProvisioning } from 'esp-provisioning-plugin';
import { Plugins } from '@capacitor/core';
import { ProvisioningServiceDev } from './__dev/ProvisioningService';
const { EspProvisioning } = Plugins;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).EspProvisioning = EspProvisioning;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ESPDevice = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NetworkList = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConnectionStatus = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Network = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProvisionStatus = any;

interface EspDeviceQRJson {
    name: string;
    pop: string; // Proof-of-Possesion
    transport: "softap" | "ble";
    security: 0 | 1; // 0 = unsecure, 1 = secure
    password: string;
}

class ProvisioningServiceProd {

    private static pendingAction: Promise<unknown>;
    private static espDevice: ESPDevice;
    private static networkList: NetworkList;
    private static network: Network;

    public static getPendingAction(): Promise<unknown> {
        return this.pendingAction;
    }
    
    public static async createEspDevice(espDeviceQRJson: EspDeviceQRJson): Promise<ESPDevice> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.pendingAction = EspProvisioning.createESPDevice(espDeviceQRJson as any);
        const result = await this.pendingAction;
        this.espDevice = result;
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

    public static async provisionDevice({ ssid, passphrase }: { ssid: string, passphrase: string}): Promise<ProvisionStatus> {
        this.pendingAction = EspProvisioning.provision({
            device: this.espDevice.id,
            ssid,
            passphrase
        });
        return this.pendingAction;
    }
}

export type IProvisioningService = InstanceType<typeof ProvisioningServiceProd>;

export const ProvisioningService = process.env.NODE_ENV === 'development'
    ? ProvisioningServiceDev
    : ProvisioningServiceProd;
