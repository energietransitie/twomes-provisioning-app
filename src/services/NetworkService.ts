


type KnownNetwork = { ssid: string, passphrase: string }

type KnownNetworkList = Array<KnownNetwork>;

export class NetworkService {
    private static KnownNetworks: KnownNetworkList = [];

    public static SaveNetwork(ssid: string, passphrase: string) : void {
        let isNewNetwork = true;

        this.KnownNetworks.forEach(element => {
            if(element.ssid === ssid)
            {
                element.passphrase = passphrase;
                isNewNetwork = false;
                return;
            }
        });

        if(isNewNetwork)
            this.KnownNetworks.push({ssid, passphrase});
    }

    public static GetKnownNetworks() : Array<KnownNetwork> {
        return this.KnownNetworks;
    }
}