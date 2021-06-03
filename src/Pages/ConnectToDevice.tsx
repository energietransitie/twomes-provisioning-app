import React, { FC, useEffect } from "react";
import { Header, Loader } from "../base-components";
import { ProvisioningService } from "../services/ProvisioningService";
import { useNavigation } from "../router/useNavigation";
import { Page, PageBody } from "../components/Page";
import { ErrorModalService } from "../services/ErrorModalService";

export const ConnectToDevice: FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const handleDeviceConnection = async () => {
            try {
                await ProvisioningService.getPendingAction();
                await ProvisioningService.connectToDevice();
                await ProvisioningService.scanForNetworks();
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
