import React, { FC, useEffect, useState, } from 'react';
import { Button, SlimButton } from '../base-components';
import { makeStyles } from '../theme/makeStyles';
import { Page, PageBody, PageFooter } from '../components/Page';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { ProvisioningService } from '../services/ProvisioningService';
import { useNavigation } from '../router/useNavigation';

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
                <p>Om dit meetapparaat te kunnen installeren zal de app u zo vragen om toestemming.</p>
                <br/> 
                <p>De Warmtewachter app zal uw locatie echter nooit opvragen. Tijdens het installeren van dit meetapparaat zal de app echter wel Bluetooth gebruiken, bij Android valt het gebruik van Bluetooth onder locatiediensten. Vandaar dat de app u toch om deze permissie moet vragen.</p>
            </PageBody>
            <PageFooter>
                    <Button label="Ok, vraag maar" onClick={handleSubmit} className={classes.padded} />
                    <SlimButton label="Ga naar Instellingen" onClick={openSettings} className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
