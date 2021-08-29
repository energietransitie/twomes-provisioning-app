import React, { FC, useEffect, useState } from 'react';
import { Button, Loader } from '../base-components';
import { Page, PageBody, PageFooter, PageHeader } from '../components/Page';

import { ProvisioningService } from '../services/ProvisioningService';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';
import { ApiService, DeviceTypeResponse } from '../services/ApiService';
import { ErrorModalService } from '../services/ErrorModalService';
import { makeStyles } from '../theme/makeStyles';

const useStyles = makeStyles({
    iframe: {
        border: 'none',
        flexGrow: 1,
        maxWidth: '100%'
    }
});

export const Instructions: FC = () => {
    const QRCodeJson = QRScanService.getQRCodeJson();
    const [isFetching, setIsFetching] = useState(true);
    const [deviceTypeData, setDeviceTypeData] = useState<DeviceTypeResponse>();

    const navigation = useNavigation();
    const classes = useStyles();

    useEffect(() => {
        ApiService.getInstallationManual(QRCodeJson.name).then((deviceType) => {
            setDeviceTypeData(deviceType);
            setIsFetching(false);
        }).catch((error) => {
            ErrorModalService.showErrorModal({ error , callback: () => {
                navigation.toRoute('ScanQRCode');
            }});
        });
    }, []);

    const handleSubmit = async () => {
        if (deviceTypeData) {
            ProvisioningService.createEspDevice(QRCodeJson, deviceTypeData);
            navigation.toRoute('ConnectToDevice');
        }
    };

    return (
        <Page>
            <PageHeader>{deviceTypeData?.display_name}</PageHeader>

            <PageBody>
                {isFetching
                    ? <Loader />
                    : <iframe className={classes.iframe} src={deviceTypeData?.installation_manual_url}></iframe> }

            </PageBody>

            <PageFooter>
                {!isFetching && <Button label="Ok, heb ik gedaan" onClick={handleSubmit} />}
            </PageFooter>
        </Page>
    );
};
