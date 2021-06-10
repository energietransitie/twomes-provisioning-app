import React, { FC, useEffect, useState } from "react";
import { Button, Header, Loader } from "../base-components";
import { ProvisioningService } from "../services/ProvisioningService";
import { useNavigation } from "../router/useNavigation";
import { Page, PageBody, PageFooter } from "../components/Page";
import { ErrorModalService } from "../services/ErrorModalService";
import { ApiService } from "../services/ApiService";
import { QRScanService } from "../services/QRScanService";

type ProvisioningStatus = 'pendingConnection' | 'pendingHeartbeat' | 'failure' | 'success';

export const ProcessProvisioning: FC = () => {
    const navigation = useNavigation();
    const [provisioningStatus, setProvisioningStatus] = useState<ProvisioningStatus>('pendingConnection');

    const QRCodeJson = QRScanService.getQRCodeJson();

    useEffect(() => {
        const handleProvisioning = async () => {
            try {
                await ProvisioningService.getPendingAction();
                setProvisioningStatus('pendingHeartbeat');

                const waitForHeartbeat = setInterval(() => {
                    ApiService.getDevice(QRCodeJson.name).then((data) => {
                        if (data.latest_measurement_timestamp) {
                            setProvisioningStatus('success');
                            clearInterval(waitForHeartbeat);
                        }
                    });
                }, 200);

                setTimeout(() => {
                    setProvisioningStatus('failure');
                    clearInterval(waitForHeartbeat);
                    ErrorModalService.showErrorModal({ error: 'Await Heartbeat Timeout', callback: () => {
                        navigation.toRoute('WifiCredentials');
                    }});
                }, 1000 * 60);
            } catch (error) {
                setProvisioningStatus('failure');
                ErrorModalService.showErrorModal({ error, callback: () => {
                    navigation.toRoute('WifiCredentials');
                }});
            }
        }
        handleProvisioning();
    }, []);

    const handleClick = () => {
        navigation.toRoute('ScanQRCode');
    }

    return (
        <Page>
            <PageBody>
                { provisioningStatus === 'pendingConnection' && <>
                    <Header>Het apparaat wordt verbonden met uw WiFi netwerk</Header>
                    <Loader style={{ margin: 60 }}/>
                    <p>Dit kan enkele seconden duren</p>
                </> }

                { provisioningStatus === 'pendingHeartbeat' && <>
                    <Header>Verbinding gelukt! We wachten nog op een eerste meting van het apparaat.</Header>
                    <Loader style={{ margin: 60 }}/>
                    <p>Dit kan enkele seconden duren</p>
                </> }

                { provisioningStatus === 'success' && <Header>Gelukt! Het apparaat is succesvol verbonden!</Header> }
                { provisioningStatus === 'failure' && <Header>Er is iets mis gegaan!</Header> }
            </PageBody>

            { provisioningStatus === 'success' && <PageFooter>
                <Button label="Scan het volgende meetapparaat" onClick={handleClick} />
            </PageFooter> }
        </Page>
    )
};
