import React, { FC } from 'react';
import { Button, Header } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { Page, PageBody } from './Page';

const useStyles = makeStyles({
    image: {
        width: '80%',
        margin: '25px 0'
    }
});

export const ScanQRCode: FC = () => {
    const classes = useStyles();

    const openQRScanner = () => {
        // TODO: Scan QR Code
    };

    return (
        <Page>
            <PageBody>
                
                <Header>Scan een QR code</Header>

                <img className={classes.image} alt="Scan" src="/resources/ScanQRCode.png" />

                <Button label="Scannen" onClick={openQRScanner} />

            </PageBody>
        </Page>
    );
};
