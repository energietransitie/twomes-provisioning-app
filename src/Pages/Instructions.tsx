import React, { FC, useEffect, useState } from 'react';
import { Button, Loader } from '../base-components';
import { Page, PageBody, PageFooter, PageHeader } from '../components/Page';

import { ESPDevice, ProvisioningService } from '../services/ProvisioningService';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';
import { ApiService } from '../services/ApiService';
import { ErrorModalService } from '../services/ErrorModalService';
import { makeStyles } from '../theme/makeStyles';

const useStyles = makeStyles({
    iframe: {
        border: 'none',
        flexGrow: 1
    }
});

export const Instructions: FC = () => {
    const QRCodeJson = QRScanService.getQRCodeJson();
    const [isFetching, setIsFetching] = useState(true);
    const [deviceData, setDeviceData] = useState<ESPDevice>(QRCodeJson);

    const navigation = useNavigation();
    const classes = useStyles();

    useEffect(() => {
        ApiService.getInstallationManual(QRCodeJson.name).then((deviceType) => {
            setDeviceData({ ...QRCodeJson, ...deviceType });
            setIsFetching(false);
        }).catch((error) => {
            ErrorModalService.showErrorModal({ error , callback: () => {
                navigation.toRoute('ScanQRCode');
            }});
        });
    }, []);

    const handleSubmit = async () => {
        deviceData && ProvisioningService.createEspDevice(deviceData);
        navigation.toRoute('ConnectToDevice');
    };

    return (
        <Page>
            <PageHeader>{QRCodeJson.name}</PageHeader>

            <PageBody>
                {isFetching
                    ? <Loader />
                    : <iframe className={classes.iframe} src={deviceData?.deviceType?.installation_manual_url}></iframe> }

            </PageBody>

            <PageFooter>
                {!isFetching && <Button label="Ok, heb ik gedaan" onClick={handleSubmit} />}
            </PageFooter>
        </Page>
    );
};
