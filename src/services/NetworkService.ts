


type KnownNetwork = { ssid: string, passphrase: string }

type KnownNetworkList = Array<KnownNetwork>;


export class NetworkService {
    private static KnownNetworks: KnownNetworkList;

    public static SaveNetwork(ssid: string, passphrase: string) : void {
        this.KnownNetworks.forEach(element => {
            if(element.ssid == ssid)
                return;
        });

        this.KnownNetworks.push({ssid, passphrase});
    }
}