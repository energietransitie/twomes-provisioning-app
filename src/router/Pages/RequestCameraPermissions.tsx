import React, { FC, useEffect, useState, } from 'react';
import { Button, SlimButton } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody, PageFooter } from './Page';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { useNavigation } from '../useNavigation';
import { CameraPermisionStatus, QRScanService } from '../../services/QRScanService';

const useStyles = makeStyles(theme => ({
    padded: {
        margin: '10px 0'
    }
}));

export const RequestCameraPermissions: FC = () => {
    const classes = useStyles();
    const navigation = useNavigation();
    const [appRefocus, setAppRefocus] = useState(0);

    useEffect(() => {
        const getPermissionStatus = async () => {
            const permissionStatus = await QRScanService.getCameraPermissionStatus();
            if (permissionStatus === CameraPermisionStatus.Granted) {
                navigation.toRoute("ScanQRCode");
            }
        };
        getPermissionStatus();
    }, [appRefocus]); 

    const onResume = () => {
        document.removeEventListener("resume",onResume);
        setAppRefocus(Date.now());
    }

    const handleSubmit = async () => {
        try{
            // TODO: Fix type
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await QRScanService.requestCameraPermission();
            navigation.toRoute('ScanQRCode');
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
                <p>Om de QR-code te kunnen scannen zal de app u zo vragen om toestemming.</p>
                <br/> 
                <p>Zonder deze permissies kunt u de meetapparaten niet goed installeren.</p>
            </PageBody>
            <PageFooter>
                    <Button label="Ok, vraag maar" onClick={handleSubmit} className={classes.padded} />
                    // Cancel button is the commonly understood way for users to cancel a partially started action
                    // TODO: is there a way to have the Cancel button next to the Ok button?
                    <Button label="Annuleren" onClick={() => { navigation.toRoute('ScanQRCode') }} className={classes.padded} />
                    <SlimButton label="Ga naar Instellingen" onClick={openSettings} className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
