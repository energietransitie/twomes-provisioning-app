import React, { FC, useEffect, useState, } from 'react';
import { Button, SlimButton } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody, PageFooter } from './Page';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { ProvisioningService } from '../../services/ProvisioningService';
import { useNavigation } from '../useNavigation';

const useStyles = makeStyles(theme => ({
    padded: {
        margin: '10px 0'
    }
}));

export const RequestLocationPermissions: FC = () => {
    const classes = useStyles();
    const navigation = useNavigation();
    const [appRefocus, setAppRefocus] = useState(0);

    useEffect(() => {
        const getPermissionStatus = async () => {
            const { permissionStatus } = await ProvisioningService.checkLocationPermissions();
            if (permissionStatus === "granted") {
                navigation.toRoute("Instructions");
            }
        };
        getPermissionStatus();
    }, [appRefocus]); // Step 3. Add appRefocus to useEffect dependency list `}, [appRefocus]); `

    const onResume = () => {
        document.removeEventListener("resume",onResume);
        setAppRefocus(Date.now());
    }

    const handleSubmit = async () => {
        try{
            // TODO: Fix type
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await ProvisioningService.requestLocationPermissions();
            navigation.toRoute('Instructions');
        } catch (e){
            console.log(e);
        }
    };
    
    const openSettings = () => {
        document.addEventListener("resume",onResume,true);
        OpenNativeSettings.open('application_details');    
    }

    return (
        <Page>
            <PageBody>
                <p>Om met dit meetapparaat te kunnen verbinden heeft de applicatie Locatie Permissies nodig.</p>
                <br/> 
                <p>Wij zullen deze permissies nooit gebruiken om daadwerkelijk uw locatie op te vragen.</p>
            </PageBody>
            <PageFooter>
                    <Button label="Ik heb het begrepen" onClick={handleSubmit} className={classes.padded} />
                    <SlimButton label="Open instellingen" onClick={openSettings} className={classes.padded} />
                    <SlimButton label="Meetapparaat niet installeren" onClick={() => { navigation.toRoute('ScanQRCode') }} className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
