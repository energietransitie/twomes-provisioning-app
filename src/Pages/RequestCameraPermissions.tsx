import React, { FC, useEffect, useState, } from 'react';
import { Button, SlimButton } from '../base-components';
import { makeStyles } from '../theme/makeStyles';
import { Page, PageBody, PageFooter } from '../components/Page';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { useNavigation } from '../router/useNavigation';
import { CameraPermisionStatus, QRScanService } from '../services/QRScanService';

const useStyles = makeStyles({
    padded: {
        margin: '10px 0'
    }
});

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
                    <SlimButton label="Ga naar Instellingen" onClick={openSettings} className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
