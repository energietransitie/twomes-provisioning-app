import React, { FC, useEffect, useState } from "react";
import { Button, PaddedContainer } from "../base-components";
import { ProvisioningService } from "../services/ProvisioningService";
import { useNavigation } from "../router/useNavigation";
import { Page, PageBody, PageFooter, PageHeader } from "../components/Page";
import { ErrorModalService } from "../services/ErrorModalService";
import { ApiService } from "../services/ApiService";
import { ActionStatus, StatusType } from "../components/ActionStatus";

export const ProcessProvisioning: FC = () => {
    const navigation = useNavigation();
    const [provisioningStatus, setProvisioningStatus] = useState<StatusType>('pending');
    const [heartbeatStatus, setHeartbeatStatus] = useState<StatusType>('not-started');

    const hasCumulativeSuccessStatus = (
        provisioningStatus === 'success' &&
        heartbeatStatus === 'success'
    );

    const {device, deviceType} = ProvisioningService.getEspDevice();

    useEffect(() => {
        const handleProvisioning = async () => {
            try {
                await ProvisioningService.getPendingAction();
                setProvisioningStatus('success');
                setHeartbeatStatus('pending');

                let waitForHeartbeat: NodeJS.Timeout | null = setInterval(() => {
                    ApiService.getDevice(device.name).then((data) => {
                        if (data.latest_measurement_timestamp) {
                            setHeartbeatStatus('success');
                            waitForHeartbeat && clearInterval(waitForHeartbeat);
                            waitForHeartbeat = null;
                        }
                    });
                }, 200);

                setTimeout(() => {
                    if (waitForHeartbeat) {
                        setHeartbeatStatus('failure');
                        clearInterval(waitForHeartbeat);
                        ErrorModalService.showErrorModal({ error: 'Await Heartbeat Timeout', callback: () => {
                            navigation.toRoute('WifiList');
                        }});
                    }
                }, 1000 * 60);
            } catch (error) {
                setProvisioningStatus('failure');
                ErrorModalService.showErrorModal({ error, callback: () => {
                    navigation.toRoute('WifiList');
                }});
            }
        }
        handleProvisioning();
    }, []);

    return (
        <Page>
            <PageHeader>{ deviceType.display_name }</PageHeader>

            <PageBody>
                <PaddedContainer>
                    <ActionStatus status="success" label="Verbinden met het apparaat" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status="success" label="Zoeken naar netwerken" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus status="success" label="Activeren van het apparaat" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus
                        status={provisioningStatus}
                        label="Verbinden met netwerk" />
                </PaddedContainer>

                <PaddedContainer>
                    <ActionStatus
                        status={heartbeatStatus}
                        label="Wachten op eerste meting" />
                </PaddedContainer>
            </PageBody>

            <PageFooter>
                <Button
                    disabled={!hasCumulativeSuccessStatus}
                    label="Scan het volgende meetapparaat"
                    onClick={() => navigation.toRoute('ScanQRCode')} />
            </PageFooter>
        </Page>
    )
};
