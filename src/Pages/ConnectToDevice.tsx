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
                    <ActionStatus status={connectingStatus} label="Verbinden met het apparaat" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status={networkScanStatus} label="Zoeken naar netwerken" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status={deviceActivationStatus} label="Activeren van het apparaat" />
                </PaddedContainer>

            </PageBody>

            <PageFooter>
                <Button
                    disabled={!hasCumulativeSuccessStatus}
                    label="Volgende stap"
                    onClick={() => navigation.toRoute('WifiList')} />
            </PageFooter>
        </Page>
    )
};
