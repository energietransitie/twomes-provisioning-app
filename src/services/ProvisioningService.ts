// import { EspProvisioning } from 'esp-provisioning-plugin';
import { Plugins } from '@capacitor/core';
const { EspProvisioning } = Plugins;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).EspProvisioning = EspProvisioning;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ESPDevice = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NetworkList = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConnectionStatus = any;

interface EspDeviceQRJson {
    name: string;
    pop: string; // Proof-of-Possesion
    transport: "softap" | "ble";
    security: 0 | 1; // 0 = unsecure, 1 = secure
    password: string;
}

export class ProvisioningService {

    private static pendingAction: Promise<unknown>;
    private static espDevice: ESPDevice;
    private static networkList: NetworkList;

    public static getPendingAction(): Promise<unknown> {
        return ProvisioningService.pendingAction;
    }
    
    public static async createEspDevice(espDeviceQRJson: EspDeviceQRJson): Promise<ESPDevice> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ProvisioningService.pendingAction = EspProvisioning.createESPDevice(espDeviceQRJson as any);
        const result = await ProvisioningService.pendingAction;
        ProvisioningService.espDevice = result;
        return ProvisioningService.espDevice;
    }
    public static getEspDevice(): ESPDevice {
        return ProvisioningService.espDevice;
    }

    public static connectToDevice(): ConnectionStatus {
        ProvisioningService.pendingAction = EspProvisioning.connectToDevice({ device: ProvisioningService.espDevice.id })
        return ProvisioningService.pendingAction;
    }

    public static async scanForNetworks(): Promise<NetworkList> {
        ProvisioningService.pendingAction = EspProvisioning.scanWifiList({ device: ProvisioningService.espDevice.id })
        const result = ProvisioningService.pendingAction;
        ProvisioningService.networkList = result;
        return ProvisioningService.networkList;
    }
    public static getNetworks(): NetworkList {
        return ProvisioningService.networkList;
    }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).ProvisioningService = ProvisioningService;
