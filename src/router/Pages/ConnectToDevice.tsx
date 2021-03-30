import React, { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { Header, Loader } from "../../base-components";
import { ProvisioningService } from "../../services/ProvisioningService";
import { Page, PageBody } from "./Page";

export const ConnectToDevice: FC = () => {
    const history = useHistory();

    useEffect(() => {
        const handleDeviceConnection = async () => {
            try {
                await ProvisioningService.getPendingAction();
                await ProvisioningService.connectToDevice();
                await ProvisioningService.scanForNetworks();
                history.push('/WifiList');
            } catch (e) {
                throw e;
            }
        }

        handleDeviceConnection();
    }, []);

    return (
        <Page>
            <PageBody>
                <Header>We maken verbinding met het apparaat.</Header>
                <Loader/>
                <p>Dit kan enkele seconden duren</p>
            </PageBody>
        </Page>
    )
};
