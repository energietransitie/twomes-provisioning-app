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

    // TODO: Remove default value before merge
    const { device } = ProvisioningService.getEspDevice() || { device: { name: 'OpenThermGateWay' } };

    const connectToNetwork = () => {
        /* */
    }

    const backToNetworkList = () => {
        history.push('/WifiList');
    };
    
    return (
        <Page>
            <PageHeader>{device.name}</PageHeader>
            
            <PageBody className={classes.pageBody} >
                <Header>Verbinden met uw WiFi-netwerk</Header>

                <div className={classes.section} >
                    <p>Netwerk naam:</p>
                    <p>VGV564AF545D</p>
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
