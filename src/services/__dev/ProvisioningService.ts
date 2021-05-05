import { IProvisioningService } from "../ProvisioningService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ESPDevice = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NetworkList = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConnectionStatus = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Network = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PermissionStatus = any;

interface EspDeviceQRJson {
    name: string;
    pop: string; // Proof-of-Possesion
    transport: "softap" | "ble";
    security: 0 | 1; // 0 = unsecure, 1 = secure
    password: string;
}

export class ProvisioningServiceDev implements IProvisioningService {

    private static pendingAction: Promise<unknown>;
    private static espDevice: ESPDevice;
    private static networkList: NetworkList = {
        count: 6,
        networks: [
            { ssid: 'VRV343AV786B', channel: 12, rssi: -51, security: true, password: "MySecretPassowrd" },
            { ssid: 'VRVASC897BDS', channel: 69, rssi: -41, security: true },
            { ssid: 'VRVAS68GASG8', channel: 54, rssi: -21, security: true },
            { ssid: 'TMNL-3454D1', channel: 32, rssi: -31, security: true },
            { ssid: 'GZA7987DF834AVS', channel: 14, rssi: -46, security: false },
            { ssid: 'Ziggo384598352', channel: 16, rssi: -25, security: true }
        ]
    };
    private static network: Network;

    public static getPendingAction(): Promise<unknown> {
        return this.pendingAction;
    }
    
    public static requestLocationPermissions(): PermissionStatus {
        return true;
    }

    public static async createEspDevice(espDeviceQRJson: EspDeviceQRJson): Promise<ESPDevice> {
        this.pendingAction = new Promise((resolve) => {
            setTimeout(() => {
                this.espDevice = { id: 0, device: espDeviceQRJson };
                resolve(this.espDevice);
            }, 1000);
        });
        return this.pendingAction;
    }
    public static getEspDevice(): ESPDevice {
        return this.espDevice || {
            id: 0,
            device: {
                name: 'PROV_XXX',
                pop: 'abcd1234',
                transport: 'ble',
                security: 1
            }
        };
    }

    public static connectToDevice(): ConnectionStatus {
        this.pendingAction = (async () => {
            setTimeout(() => {
                return true;
            }, 1000);
        })();
        return this.pendingAction;
    }

    public static async scanForNetworks(): Promise<NetworkList> {
        this.pendingAction = new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.networkList);
            }, 1000);
        });
        return this.pendingAction;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async provisionDevice(network: Network): Promise<void> {
        this.pendingAction = new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.pendingAction;
    }
}
