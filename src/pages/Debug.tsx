import React, { FC, useState } from 'react';
import { Button } from '../base-components/Button';
import { makeStyles } from '../theme/makeStyles';
import { Plugins } from '@capacitor/core';
import { IonContent, IonPage } from '@ionic/react';

const { EspProvisioning } = Plugins;

console.log('[PLUGIN]:', EspProvisioning);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).EspProvisioning = EspProvisioning;

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        background: theme.colors.white,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    controls: {
        padding: 20,
        height: '40%',

        '& > *': {
            marginBottom: 10,
            display: 'block'
        }
    },
    console: {
        background: theme.colors.grey100,
        display: 'flex',
        width: '100%',
        height: '60%',
        overflowY: 'auto',
        boxShadow: 'inset 0 0 20px rgb(0,0,0,0.2)',
        color: theme.colors.grey800,
        padding: 10,
        whiteSpace: 'pre-wrap',
        boxSizing: 'border-box',
        position: 'relative'
    },
    '@keyframes pending': {
        from: { opacity: 1 },
        to: { opacity: 0.5 }
    },
    pending: {
        position: 'absolute',
        width: 100,
        height: 40,
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 50px)',
        color: theme.colors.grey900,
        background: theme.colors.grey300,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: '$pending 600ms ease-in-out infinite alternate'
    }
}));

export const Debug: FC = () => {
    const classes = useStyles();

    const [consoleData, setConsoleData] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string|undefined>();

    const handleAction = <P extends unknown, R extends unknown>(action: (data?: P) => Promise<R>, params?: P): void => {
        // Reset state and set Pending
        setConsoleData('');
        setError(undefined);
        setIsPending(true);

        // Handle action success and failure
        action(params).then((data) => {
            setIsPending(false);
            setConsoleData(JSON.stringify(data, null, 4));
        }).catch((error) => {
            setIsPending(false);
            setError(JSON.stringify(error));
        });
    };

    const searchBleEspDevices = () => {
        // const params = { prefix: 'PROV' };
        const params = { prefix: '' };
        handleAction(EspProvisioning.searchBleEspDevices, params);
    };

    const searchWifiEspDevices = async (): Promise<void> => {
        const params = { prefix: 'PROV' };
        handleAction(EspProvisioning.searchWifiEspDevices, params);
    };

    const scanQRCode = async (): Promise<void> => {
        handleAction(EspProvisioning.scanQRCode);
    };

    return (
        <IonPage>
            <IonContent fullscreen >
                <div className={classes.container} >
                    <div className={classes.controls} >
                        <a href="/error" >Go Back</a>
                        <Button label="searchBleEspDevices" onClick={searchBleEspDevices} />
                        <Button label="searchWifiEspDevices" onClick={searchWifiEspDevices} />
                        <Button label="scanQRCode" onClick={scanQRCode} />
                    </div>

                    <div className={classes.console} >
                        { error
                            ? `ERROR: ${error}`
                            : consoleData }
                        { isPending && <span className={classes.pending} >Pending...</span>}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
