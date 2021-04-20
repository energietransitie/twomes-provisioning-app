import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router';
import { Header, SlimButton, List, ListItem, Input, Button } from '../../base-components';
import { ProvisioningService, Network } from '../../services/ProvisioningService';
import { NetworkService } from '../../services/NetworkService';
import { makeStyles } from '../../theme/makeStyles';
=======
import { Header, SlimButton, List, ListItem } from '../../base-components';
import { ProvisioningService } from '../../services/ProvisioningService';
import { useNavigation } from '../useNavigation';
>>>>>>> 89a484d4869a16c12a22ff9c635dc25275a5b10c
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
<<<<<<< HEAD
    const knownNetworks = NetworkService.GetKnownNetworks();
    const classes = useStyles();
    const history = useHistory();
=======
    const navigation = useNavigation();
>>>>>>> 89a484d4869a16c12a22ff9c635dc25275a5b10c

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [networkList, setNetworkList] = useState<Network[]>();
    const [activeNetwork, setActiveNetwork] = useState<Network>();
    const [passphrase, setPassphrase] = useState('');

    {
        console.log(ProvisioningService.getNetworks())
    }
    
    useEffect(() => {
        const getNetworks = async () => {
            await ProvisioningService.getPendingAction();
            const { networks } = await ProvisioningService.getNetworks();
            setNetworkList(networks);
        };

        getNetworks();
    }, []);

    const previousStep = () => {
        navigation.toRoute('ScanQRCode');
    };

<<<<<<< HEAD
    const connectToNetwork = (network: Network) => {
        ProvisioningService.provisionDevice({ssid: network.ssid, passphrase})
        history.push('/ProcessProvisioning');
    }

    const handlePasswordChange = (value: string) => {
        setPassphrase(value);
=======
    const selectNetwork = (network: Network) => {
        ProvisioningService.setNetwork(network);
        navigation.toRoute('WifiCredentials');
>>>>>>> 89a484d4869a16c12a22ff9c635dc25275a5b10c
    };

    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody>
                <Header>Selecteer uw WiFi-netwerk</Header>
                <List className={'my-custom-list'} >
                    {networkList && networkList.map((network: Network) => network === activeNetwork
                        ? <div className={classes.container} key={network.ssid} onClick={() => setActiveNetwork(network)}>
                                <div>{network.ssid}</div>

                                <Input password
                                    className={classes.section}
                                    label="Wachtwoord:"
                                    placeholder="vul hier uw wachtwoord"
                                    onChange={handlePasswordChange} 
                                />
                                
                                
                                <Button
                                    className={classes.section}
                                    label="Verbinden"
                                    onClick={() => connectToNetwork(network)}
                                />

                            </div>

                        : <ListItem key={network.ssid} onClick={() => setActiveNetwork(network)}>{network.ssid}</ListItem>
                    )}
                </List>
            </PageBody>

            <PageFooter>
                <SlimButton label='Vorige stap' onClick={previousStep} />
            </PageFooter>
        </Page>
    )
};
