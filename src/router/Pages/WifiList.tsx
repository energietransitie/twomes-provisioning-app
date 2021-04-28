import React, { FC, useEffect, useState } from 'react';
import { Header, SlimButton, List, ListItem, Input, Button } from '../../base-components';
import { ProvisioningService, Network } from '../../services/ProvisioningService';
import { NetworkService } from '../../services/NetworkService';
import { makeStyles } from '../../theme/makeStyles';
import { useNavigation } from '../useNavigation';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

const useStyles = makeStyles(theme => ({
    section: {
        width: '100%',
        margin: '10px 0'
    },
    container: {
        display: 'block',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: '10px 20px',
        margin: '1px 0 0 0',
        backgroundColor: theme.colors.white
    }
}));

export const WifiList: FC = () => {
    const { device } = ProvisioningService.getEspDevice();
    const classes = useStyles();
    const navigation = useNavigation();

    const [networkList, setNetworkList] = useState<Network[]>([]);
    const [activeNetwork, setActiveNetwork] = useState<Network>();
    const [intialPassphraseFocus, setInitialPassphraseFocus] = useState(true);
    const [passphrase, setPassphrase] = useState<string>();

    useEffect(() => {
        const getNetworks = async () => {
            await ProvisioningService.getPendingAction();
            const { networks } = await ProvisioningService.getNetworks();
            const sortedNetworks = NetworkService.findKnownNetworks(networks.sort((a: Network, b: Network) => (a.rssi < b.rssi) ? 1 : -1));
            if (sortedNetworks.length > 0){
                handleSelection(sortedNetworks[0]);
            }
            setNetworkList(sortedNetworks);  
        };

        getNetworks();   
    }, []);

    const previousStep = () => {
        navigation.toRoute('ScanQRCode');
    };

    const connectToNetwork = (network: Network) => {
        network.passphrase = passphrase;
        ProvisioningService.provisionDevice(network)
        navigation.toRoute("ProcessProvisioning");
    };

    const handleSelection = (network: Network) => {
        setActiveNetwork(network);
        setPassphrase(network.passphrase || ''); // OR if known network set known passphrase
        setInitialPassphraseFocus(true);
    }

    const handlePasswordChange = (value: string) => {
        setPassphrase(value);
    };

    const handlePasswordFocus = () => {
        if (intialPassphraseFocus) {
            setPassphrase('');
            setInitialPassphraseFocus(false);
        }
    };

    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody>
                <Header>Selecteer uw WiFi-netwerk</Header>
                
                {
                    networkList.length <= 0 ? <div>Geen netwerken gevonden</div> :
                                        
                    <List className={'my-custom-list'} >
                        {networkList && networkList.map((network: Network) => network === activeNetwork
                            ? <div className={classes.container} key={network.ssid}>

                                    <div>{network.ssid}</div>

                                    <Input password
                                        className={classes.section}
                                        value={passphrase}
                                        label="Wachtwoord:"
                                        disabled={!network.isSecured}
                                        placeholder={network.isSecured ? "vul hier uw wachtwoord" : "onbeveiligd netwerk"}
                                        onChange={handlePasswordChange}
                                        onFocus={handlePasswordFocus}
                                    />


                                    <Button
                                        className={classes.section}
                                        label="Verbinden"
                                        onClick={() => connectToNetwork(network)}
                                    />

                                </div>

                            : <ListItem key={network.ssid} onClick={() => handleSelection(network)}>{network.ssid}</ListItem>
                        )}
                    </List>
                }

            </PageBody>

            <PageFooter>
                <SlimButton label='Vorige stap' onClick={previousStep} />
            </PageFooter>
        </Page>
    )
};
