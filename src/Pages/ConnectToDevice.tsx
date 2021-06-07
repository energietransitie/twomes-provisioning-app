import React, { FC, useEffect } from "react";
import { Header, Loader } from "../base-components";
import { ProvisioningService } from "../services/ProvisioningService";
import { useNavigation } from "../router/useNavigation";
import { Page, PageBody } from "../components/Page";
import { ErrorModalService } from "../services/ErrorModalService";
import { QRScanService } from "../services/QRScanService";
import { ApiService } from "../services/ApiService";

export const ConnectToDevice: FC = () => {
    const navigation = useNavigation();
    const QRCodeJson = QRScanService.getQRCodeJson();

    useEffect(() => {
        const handleDeviceConnection = async () => {
            try {
                await ProvisioningService.getPendingAction();
                await ProvisioningService.connectToDevice();
                await ProvisioningService.scanForNetworks();
                await ApiService.activateDevice(QRCodeJson.pop);
                navigation.toRoute('WifiList');
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
            <PageBody>
                <Header>We maken verbinding met het apparaat.</Header>
                
                <Loader style={{ padding: 60 }} />

                <div>
                    Dit kan enkele seconden duren
                </div>
            </PageBody>
        </Page>
    )
};
