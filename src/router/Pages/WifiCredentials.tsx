import React, { FC, useState } from 'react';
import { Button, Header, Input, SlimButton } from '../../base-components';
import { ProvisioningService } from '../../services/ProvisioningService';
import { makeStyles } from '../../theme/makeStyles';
import { useNavigation } from '../useNavigation';
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
    const navigation = useNavigation();
    const [passphrase, setPassphrase] = useState('');

    const { device } = ProvisioningService.getEspDevice();
    const network = ProvisioningService.getNetwork();

    const connectToNetwork = () => {
        ProvisioningService.provisionDevice(network)
        navigation.toRoute('ProcessProvisioning');
    }

    const backToNetworkList = () => {
        navigation.toRoute('WifiList');
    };

    const handlePasswordChange = (value: string) => {
        setPassphrase(value);
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
                        onChange={handlePasswordChange} />
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
