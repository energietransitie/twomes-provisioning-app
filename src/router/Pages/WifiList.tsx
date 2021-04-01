import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Header, SlimButton, List, ListItem } from '../../base-components';
import { ProvisioningService } from '../../services/ProvisioningService';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

const useStyles = makeStyles(theme => ({
    container: {

    }
}));

export const WifiList: FC = () => {
    const { device } = ProvisioningService.getEspDevice();
    const classes = useStyles();
    const history = useHistory();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [networkList, setNetworkList] = useState<any>();
    
    useEffect(() => {
        const getNetworks = async () => {
            // await ProvisioningService.getPendingAction();
            const { networks } = await ProvisioningService.getNetworks();
            setNetworkList(networks);
        };

        getNetworks();
    }, []);

    const previousStep = () => {
        //
    };

    const selectNetwork = (ssid: string) => {
        console.log('Selected network: ', ssid);
        // history.push('/requestPassword');
    };

    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody>
                <Header>Selecteer uw WiFi-netwerk</Header>
                <List className={'my-custom-list'} >
                    {networkList && networkList.map((network: { ssid: string }) => (
                        <ListItem onClick={() => selectNetwork(network.ssid)}>{network.ssid}</ListItem>
                    ))}
                </List>

                {/* TODO: Fix typing */}
                {/* <ul>
                    {networkList && networkList.map((network: { ssid: string }) => (
                        <li>{network.ssid}</li>
                    ))}
                </ul> */}
            </PageBody>

            <PageFooter>
                <SlimButton label='Vorige stap' onClick={previousStep} />
            </PageFooter>
        </Page>
    )
};
