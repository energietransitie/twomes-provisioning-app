import React, { FC } from 'react';
import { Button } from '../base-components';
import { Page, PageBody, PageFooter, PageHeader } from '../components/Page';

import { ProvisioningService } from '../services/ProvisioningService';
import { QRScanService } from '../services/QRScanService';
import { useNavigation } from '../router/useNavigation';

export const Instructions: FC = () => {
    const navigation = useNavigation();

    const QRCodeJson = QRScanService.getQRCodeJson();

    const handleSubmit = async () => {
        // TODO: Fix type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ProvisioningService.createEspDevice(QRCodeJson);
        navigation.toRoute('ConnectToDevice');
    };

    return (
        <Page>
            <PageHeader>{QRCodeJson.name}</PageHeader>

            <PageBody>
                Steek de stekker in het stopcontact
            </PageBody>

            <PageFooter>
                <Button label="Volgende stap" onClick={handleSubmit} />
            </PageFooter>
        </Page>
    );
};
