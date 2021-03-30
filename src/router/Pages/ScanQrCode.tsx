import React, { FC, useState, useEffect } from 'react';
import { Button, Header, PaddedContainer, Portal, SlimButton } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody } from './Page';

import { Plugins } from '@capacitor/core';
import { ProvisioningService } from '../../services/ProvisioningService';
import { useHistory } from 'react-router';

const { BarcodeScanner } = Plugins;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).BarcodeScanner = BarcodeScanner;

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
        const styleNode = document.createElement('style');
        if (isScanning) {
            document.head.appendChild(styleNode);
            (styleNode.sheet as CSSStyleSheet).insertRule('#root { opacity: 0 }');

            return () => {
                document.head.removeChild(styleNode);
            }
        }
    }, [isScanning]);

    const scanQR = async () => {
        setIsScanning(true);
        BarcodeScanner.hideBackground();

        const result = await BarcodeScanner.startScan();
        ProvisioningService.createEspDevice(JSON.parse(result.content));
        
        BarcodeScanner.showBackground();
        setIsScanning(false);

        history.push("/ConnectToDevice");
    };

    const cancelScan = () => {
        setIsScanning(false);
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
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
