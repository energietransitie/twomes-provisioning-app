import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Header, SlimButton, List, ListItem, Input, Button } from '../../base-components';
import { ProvisioningService, Network } from '../../services/ProvisioningService';
import { NetworkService } from '../../services/NetworkService';
import { makeStyles } from '../../theme/makeStyles';
import { useNavigation } from '../useNavigation';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

// TODO: replace temp type with actual type from esp-provisioning-plugin
// eslint-disable-next-line @typescript-eslint/no-explicit-any

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
    const knownNetworks = NetworkService.GetKnownNetworks();
    const classes = useStyles();
    const history = useHistory();
    const navigation = useNavigation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [networkList, setNetworkList] = useState<Network[]>([]);
    const [activeNetwork, setActiveNetwork] = useState<Network>();
    const [intialPassphraseFocus, setInitialPassphraseFocus] = useState(true);
    const [passphrase, setPassphrase] = useState<string>();

    useEffect(() => {
        const getNetworks = async () => {
            await ProvisioningService.getPendingAction();
            const { networks } = await ProvisioningService.getNetworks();
            setNetworkList(findKnownNetworks(networks.sort((a: Network, b: Network) => (a.rssi < b.rssi) ? 1 : -1)));  
        };

        getNetworks();
    }, []);

    const findKnownNetworks = (networks: Network[]) => {
        const sortedNetworks: Network[] = [];

        // Add previously used networks to sortedNetworks in order based on rssi.
        knownNetworks.forEach(network => {
            if(networks.some(n => n.ssid === network.ssid))
            {
                const n = networks.find(n => n.ssid === network.ssid);
                if(n === undefined)
                    return;

                // Add network to sortedlist.
                sortedNetworks.push(n);
            }
        });

        // Add networks not previously used for provisioning to sortedNetworks in order based on rssi. 
        networks.forEach(network => {
            if (!sortedNetworks.includes(network)) {
                sortedNetworks.push(network);
        }});

        // Set first network active.
        if(sortedNetworks.length > 0)
            handleSelection(sortedNetworks[0]);

        return sortedNetworks;
    };

    const previousStep = () => {
        navigation.toRoute('ScanQRCode');
    };

    const connectToNetwork = (network: Network) => {
        network.passphrase = passphrase;
        ProvisioningService.provisionDevice(network)
        history.push('/ProcessProvisioning');
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


    console.log(ProvisioningService.getNetworks());

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
