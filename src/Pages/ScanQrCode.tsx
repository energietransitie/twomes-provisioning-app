import React, { FC, useState, useEffect } from 'react';
import { Button, Header, PaddedContainer, Portal, SlimButton } from '../base-components';
import { makeStyles } from '../theme/makeStyles';
import { Page, PageBody } from '../components/Page';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';
import { isPlatform } from '@ionic/react';

const useStyles = makeStyles(theme => ({
    image: {
        width: '80%',
        margin: '25px 0'
    },
    scanView: {
        height: '40%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        background: theme.colors.white
    }
}));

export const ScanQRCode: FC = () => {
    const classes = useStyles();
    const [isScanning, setIsScanning] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (isScanning) {
            QRScanService.prepareQRScan();
            return QRScanService.unprepareQRScan;
        }
    }, [isScanning]);

    const scanQR = async () => {
        setIsScanning(true);
        await QRScanService.requestCameraPermission();
        const QRCodeJson = await QRScanService.scan();
        setIsScanning(false);

        if(QRCodeJson.transport === "ble"){
            if(isPlatform('android')){
                navigation.toRoute('RequestLocationPermissions');
            } else {
                navigation.toRoute('Instructions');
            }
        } else {
            navigation.toRoute('Instructions');
        }
    };

    const cancelScan = () => {
        setIsScanning(false);
        QRScanService.stopScan();
    };

    return isScanning ? (
        <Portal name="cameraview" >
            <PaddedContainer className={classes.scanView} >
                <Header>Richt uw camera op de QR-code</Header>
                <SlimButton label='Annuleren' onClick={cancelScan} />
            </PaddedContainer>
        </Portal>
    ) : (
        <Page>
            <PageBody>
                <Header h1={true} >Scan een QR-code</Header>
                <p>Pak een meetapparaatje. De de QR-code staat op een sticker, meestal op de achterkant van het meetapparaatje.</p>
                <br/>
                <img className={classes.image} alt="Scan" src="/resources/ScanQRCode.png" />
                <Button label="Scannen" onClick={scanQR} />
            </PageBody>
        </Page>
    );
};
