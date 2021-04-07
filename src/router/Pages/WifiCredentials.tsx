import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { Button, Header, Input, SlimButton } from '../../base-components';
import { ProvisioningService } from '../../services/ProvisioningService';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

const useStyles = makeStyles({
    pageBody: {
        alignItems: 'flex-start'
    },
    section: {
        width: '100%',
        margin: '10px 0'
    }
});

export const WifiCredentials: FC = () => {
    const classes = useStyles();
    const history = useHistory();

    // TODO: Remove default values before merge
    const { device } = ProvisioningService.getEspDevice() || { device: { name: 'OpenThermGateWay' } };
    // const { network } = ProvisioningService.getNetwork()
    const network = { ssid: 'VGV564AF545D' }

    const connectToNetwork = () => {
        /*
            ProvisioningService.ProvisionDevice({ssid, passphrase})
            history.push('/ProcessProvisioning');
        */
    }

    const backToNetworkList = () => {
        history.push('/WifiList');
    };
    
    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody className={classes.pageBody} >
                <Header h2 className={classes.section} >Verbinden met uw WiFi-netwerk</Header>

                <div className={classes.section} >
                    <Header h3>Netwerk naam:</Header>
                    <p>{network.ssid}</p>
                </div>

                <div className={classes.section} >
                    <Input password
                        label="Wachtwoord:"
                        placeholder="vul hier uw wachtwoord"
                        onChange={() => { /**/ } } />
                </div>
            </PageBody>

            <PageFooter>
                <Button
                    className={classes.section}
                    label="Verbinden"
                    onClick={connectToNetwork}/>

                <SlimButton
                    label="Kies een ander netwerk"
                    onClick={backToNetworkList} />
            </PageFooter>
        </Page>
    );
};
