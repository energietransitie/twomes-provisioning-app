import React, { FC, useEffect, useState } from 'react';
import { Button, Loader } from '../base-components';
import { Page, PageBody, PageFooter, PageHeader } from '../components/Page';

import { ProvisioningService } from '../services/ProvisioningService';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';
import { ApiService } from '../services/ApiService';
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
    const [isFetching, setIsFetching] = useState(true);
    const [instructionsSrc, setInstructionsSrc] = useState<string>();

    const navigation = useNavigation();
    const classes = useStyles();

    const QRCodeJson = QRScanService.getQRCodeJson();

    useEffect(() => {
        ApiService.getInstallationManual(QRCodeJson.name).then((data) => {
            setInstructionsSrc(data.installation_manual_url);
            setIsFetching(false);
        }).catch((error) => {
            ErrorModalService.showErrorModal({ error , callback: () => {
                navigation.toRoute('ScanQRCode');
            }});
        });
    }, []);

    const handleSubmit = async () => {
        ProvisioningService.createEspDevice(QRCodeJson);
        navigation.toRoute('ConnectToDevice');
    };

    return (
        <Page>
            <PageHeader>{QRCodeJson.name}</PageHeader>

            <PageBody>
                {isFetching
                    ? <Loader />
                    : <iframe className={classes.iframe} src={instructionsSrc}></iframe> }

            </PageBody>

            <PageFooter>
                {!isFetching && <Button label="Ok, heb ik gedaan" onClick={handleSubmit} />}
            </PageFooter>
        </Page>
    );
};
