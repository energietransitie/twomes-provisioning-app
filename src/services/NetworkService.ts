import { Network } from '../services/ProvisioningService';



type KnownNetworkList = Array<Network>;

export class NetworkService {
    private static KnownNetworks: KnownNetworkList = [];

    public static SaveNetwork(network: Network) : void {
        let isNewNetwork = true;

        this.KnownNetworks.forEach(element => {
            if(element.ssid === network.ssid){
                element.passphrase = network.passphrase;
                isNewNetwork = false;
                return;
            }
        });

        if(isNewNetwork){
            this.KnownNetworks.push(network);
        }
    }

    public static findKnownNetworks = (networks: Network[]) : Network[] => {
        const sortedNetworks: Network[] = [];

        // Add previously used networks to sortedNetworks in order based on rssi.
        NetworkService.KnownNetworks.forEach(network => {
            if(networks.some(n => n.ssid === network.ssid)){
                const n = networks.find(n => n.ssid === network.ssid);
                if(n === undefined) {
                    return;
                }

                // Add network to sortedlist.
                sortedNetworks.push(n);
            }
        });

        // Add networks not previously used for provisioning to sortedNetworks in order based on rssi. 
        networks.forEach(network => {
            if (!sortedNetworks.includes(network)) {
                sortedNetworks.push(network);
        }});

        return sortedNetworks;
    };

    public static GetKnownNetworks() : Array<Network> {
        return this.KnownNetworks;
    }
}