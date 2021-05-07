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
    },
    invisible: {
        color: theme.colors.white
    },
    alert: {
        color: theme.colors.statusAlert
    }
}));

export const RequestPermissions: FC = () => {
    const classes = useStyles();
    const navigation = useNavigation();
    const [isPermissionRejected, setIsPermissionRejected] = useState(false);
    const [isReprompt, setIsReprompt] = useState(false);
    // Step 1. Add new state property
    // const [appRefocus, setAppRefocus] = useState(0);

    useEffect(() => {
        const getPermissionStatus = async () => {
            const { permissionStatus } = await ProvisioningService.checkLocationPermissions();
            if(permissionStatus === "denied"){
                setIsPermissionRejected(true);
            }
        };

        // step 2, Register event handler for app going back to ACTIVE from INACTIVE
        /*
        onAppRefocus(() => {
            setAppRefocus(Date.now());
        })
        */

        getPermissionStatus();
    }, []); // Step 3. Add appRefocus to useEffect dependency list `}, [appRefocus]); `

    const handleSubmit = async () => {
        try{
            // TODO: Fix type
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await ProvisioningService.requestLocationPermissions();
            navigation.toRoute('Instructions');
        } catch (e){
            console.log(e);
            setIsPermissionRejected(true);
            setIsReprompt(true);
        }
    };
    
    const openSettings = () => {
        OpenNativeSettings.open('application_details');    
    }

    return (
        <Page>
            <PageBody>
                <p>Om met dit meetapparaat te kunnen verbinden heeft de applicatie Locatie Permissies nodig.</p>
                <br/> 
                <p>Wij zullen deze permissies nooit gebruiken om daadwerkelijk uw locatie op te vragen.</p>
                <br/>
                <br/>
                <br/>
                { isReprompt
                    ? <p className={classes.alert}>Weet u zeker dat u Locatie Permissies wilt weigeren? Zonder deze permissies kan dit meetapparaat niet worden geïnstalleerd.</p>
                : <p className={classes.invisible}>Weet u zeker dat u Locatie Permissies wilt weigeren? Zonder deze permissies kan dit meetapparaat niet worden geïnstalleerd.</p> }
            </PageBody>
            <PageFooter>
                { isPermissionRejected
                    ? <div>
                        <Button label="Open instellingen" onClick={openSettings} className={classes.padded} />
                        <SlimButton onClick={() => { navigation.toRoute('ScanQRCode') }} label="Meetapparaat niet installeren" className={classes.padded} />
                    </div>
                    : <Button label="Ik heb het begrepen" onClick={handleSubmit} /> }
            </PageFooter>
        </Page>
    );
};
