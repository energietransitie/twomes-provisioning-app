import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Header, SlimButton, List, ListItem } from '../../base-components';
import { ProvisioningService } from '../../services/ProvisioningService';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

// TODO: replace temp type with actual type from esp-provisioning-plugin
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Network = any;

export const WifiList: FC = () => {
    const { device } = ProvisioningService.getEspDevice();
    const history = useHistory();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [networkList, setNetworkList] = useState<any>();
    
    useEffect(() => {
        const getNetworks = async () => {
            await ProvisioningService.getPendingAction();
            const { networks } = await ProvisioningService.getNetworks();
            setNetworkList(networks);
        };

        getNetworks();
    }, []);

    const previousStep = () => {
        history.push('/ScanQrCode');
    };

    const selectNetwork = (network: Network) => {
        ProvisioningService.setNetwork(network);
        history.push('/WifiCredentials');
    };

    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody>
                <Header>Selecteer uw WiFi-netwerk</Header>
                <List className={'my-custom-list'} >
                    {networkList && networkList.map((network: Network) => (
                        <ListItem key={network.ssid} onClick={() => selectNetwork(network)}>{network.ssid}</ListItem>
                    ))}
                </List>
            </PageBody>

            <PageFooter>
                <SlimButton label='Vorige stap' onClick={previousStep} />
            </PageFooter>
        </Page>
    )
};
