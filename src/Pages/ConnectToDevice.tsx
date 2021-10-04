import React, { FC, useEffect, useState } from "react";
import { Button, PaddedContainer } from "../base-components";
import { ProvisioningService } from "../services/ProvisioningService";
import { useNavigation } from "../router/useNavigation";
import { Page, PageBody, PageFooter, PageHeader } from "../components/Page";
import { ErrorModalService } from "../services/ErrorModalService";
import { QRScanService } from "../services/QRScanService";
import { ApiService } from "../services/ApiService";
import { ActionStatus, StatusType } from "../components/ActionStatus";

export const ConnectToDevice: FC = () => {
    const [connectingStatus, setConnectingStatus] = useState<StatusType>('pending');
    const [networkScanStatus, setNetworkScanStatus] = useState<StatusType>('not-started');
    const [deviceActivationStatus, setDeviceActivationStatus] = useState<StatusType>('not-started');

    const hasCumulativeSuccessStatus = (
        connectingStatus === 'success' &&
        networkScanStatus === 'success' &&
        deviceActivationStatus === 'success'
    );

    const navigation = useNavigation();
    const QRCodeJson = QRScanService.getQRCodeJson();

    useEffect(() => {
        const handleDeviceConnection = async () => {
            try {
                await ProvisioningService.getPendingAction();
                await ProvisioningService.connectToDevice();
                setConnectingStatus('success');

                setNetworkScanStatus('pending');
                await ProvisioningService.scanForNetworks();
                setNetworkScanStatus('success');

                setDeviceActivationStatus('pending');
                await ApiService.activateDevice(QRCodeJson.pop);
                setDeviceActivationStatus('success');
            } catch (error) {
                ErrorModalService.showErrorModal({ error, callback: () => {
                    navigation.toRoute('Instructions');
                }});
            }
        }

        handleDeviceConnection();
    }, []);

    return (
        <Page>
            <PageHeader>We maken verbinding met het apparaat.</PageHeader>
            <PageBody>
                <PaddedContainer>
                    <ActionStatus status={connectingStatus} label="Zoeken apparaatje" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status={networkScanStatus} label="Zoeken netwerken" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status="not-started" label="Verbinden met netwerk" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status="not-started" label="Wachten op data" />
                </PaddedContainer>

            </PageBody>

            <PageFooter>
                <Button
                    disabled={!hasCumulativeSuccessStatus}
                    label="Kies netwerk"
                    onClick={() => navigation.toRoute('WifiList')} />
            </PageFooter>
        </Page>
    )
};
