import React, { FC, useEffect } from "react";
import { Header, Loader } from "../../base-components";
import { ProvisioningService } from "../../services/ProvisioningService";
import { useNavigation } from "../useNavigation";
import { Page, PageBody } from "./Page";

export const ConnectToDevice: FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const handleDeviceConnection = async () => {
            try {
                await ProvisioningService.getPendingAction();
                await ProvisioningService.connectToDevice();
                await ProvisioningService.scanForNetworks();
                navigation.toRoute('WifiList');
            } catch (e) {
                console.log(e);
                alert(e);
                navigation.toRoute('ScanQRCode');
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
