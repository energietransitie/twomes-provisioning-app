import React, { FC, useState, useEffect } from 'react';
import { Button, Header, PaddedContainer, Portal, SlimButton } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody } from './Page';

import { ProvisioningService } from '../../services/ProvisioningService';
import { useHistory } from 'react-router';
import { QRScanService } from '../../services/QRScanService';

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

    const history = useHistory();

    useEffect(() => {
        if (isScanning) {
            QRScanService.prepareQRScan();
            return QRScanService.unprepareQRScan;
        }
    }, [isScanning]);

    const scanQR = async () => {
        setIsScanning(true);
        const result = await QRScanService.scan();
        // TODO: Fix type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ProvisioningService.createEspDevice(result);
        setIsScanning(false);

        history.push("/ConnectToDevice");
    };

    const cancelScan = () => {
        setIsScanning(false);
        QRScanService.stopScan();
    };

    return isScanning ? (
        <Portal name="cameraview" >
            <PaddedContainer className={classes.scanView} >
                <Header>Richt uw camera op de QR code</Header>
                <SlimButton label='Annuleren' onClick={cancelScan} />
            </PaddedContainer>
        </Portal>
    ) : (
        <Page>
            <PageBody>
                <Header>Scan een QR code</Header>
                <img className={classes.image} alt="Scan" src="/resources/ScanQRCode.png" />
                <Button label="Scannen" onClick={scanQR} />
            </PageBody>
        </Page>
    );
};
