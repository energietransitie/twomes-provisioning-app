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
                <p>Om de QR code te scannen heeft de applicatie Camera Permissies nodig.</p>
                <br/> 
                <p>Zonder deze permissies kunnen de meetapparaten niet geïnstalleerd worden.</p>
            </PageBody>
            <PageFooter>
                    <Button label="Ik heb het begrepen" onClick={handleSubmit} className={classes.padded} />
                    <SlimButton label="Open instellingen" onClick={openSettings} className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
