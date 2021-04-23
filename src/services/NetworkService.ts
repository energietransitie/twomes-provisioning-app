import { Network } from '../services/ProvisioningService';



type KnownNetworkList = Array<Network>;

export class NetworkService {
    private static KnownNetworks: KnownNetworkList = [
        { ssid: 'TMNL-3454D1', channel: 32, rssi: -31, passphrase: "Marco" },
        { ssid: 'GZA7987DF834AVS', channel: 14, rssi: -46 }
    ];

    public static SaveNetwork(network: Network) : void {
        let isNewNetwork = true;

        this.KnownNetworks.forEach(element => {
            if(element.ssid === network.ssid)
            {
                element.passphrase = network.passphrase;
                isNewNetwork = false;
                return;
            }
        });

        if(isNewNetwork)
            this.KnownNetworks.push(network);
    }

    public static GetKnownNetworks() : Array<Network> {
        return this.KnownNetworks;
    }
}