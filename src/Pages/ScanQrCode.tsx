import React, { FC, useState, useEffect } from 'react';
import { Button, Header, PaddedContainer, Portal, SlimButton } from '../base-components';
import { makeStyles } from '../theme/makeStyles';
import { Page, PageBody } from '../components/Page';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';
import { isPlatform } from '@ionic/react';
import { QRScanBoundaries } from '../components/QRScanBoundaries';

const useStyles = makeStyles(theme => ({
    image: {
        width: '80%',
        margin: '25px 0'
    },
    scanViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    scanViewTop: {
        display: 'flex',
        justifyContent: 'center',
        background: theme.colors.white,
        padding: '30px 0',
    },
    scanViewMiddle: {
        margin: '0 auto'
    },
    scanViewBottom: {
        display: 'flex',
        justifyContent: 'center',
        background: theme.colors.white,
        padding: '20px 0',
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
        console.log('MARCO');
        QRScanService.getCameraPermissionStatus().then(async () => {
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
        }).catch(() => {
            navigation.toRoute('RequestCameraPermissions');
        });
    };

    const cancelScan = () => {
        setIsScanning(false);
        QRScanService.stopScan();
    };

    return isScanning ? (
        <Portal name="cameraview" className={classes.scanViewContainer} >
            <PaddedContainer className={classes.scanViewTop} >
                <Header h2>Richt uw camera op de QR-code</Header>
            </PaddedContainer>

            <QRScanBoundaries className={classes.scanViewMiddle} />

            <PaddedContainer className={classes.scanViewBottom} >
                <SlimButton label='Annuleren' onClick={cancelScan} />
            </PaddedContainer>
        </Portal>
    ) : (
        <Page>
            <PageBody>
                <Header h1>Scan een QR-code</Header>
                <p>Pak een meetapparaatje. De QR-code staat op een sticker, meestal op de achterkant van het meetapparaatje.</p>
                <br/>
                <img className={classes.image} alt="Scan" src="/resources/ScanQRCode.png" />
                <Button label="Scannen" onClick={scanQR} />
            </PageBody>
        </Page>
    );
};
