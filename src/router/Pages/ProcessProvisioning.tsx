import React, { FC, useEffect, useState } from "react";
import { Header, Loader } from "../../base-components";
import { ProvisioningService } from "../../services/ProvisioningService";
import { useNavigation } from "../useNavigation";
import { Page, PageBody } from "./Page";

type ProvisioningStatus = 'pending' | 'failure' | 'success';

export const ProcessProvisioning: FC = () => {
    const navigation = useNavigation();
    const [provisioningStatus, setProvisioningStatus] = useState<ProvisioningStatus>('pending');

    useEffect(() => {
        const handleProvisioning = async () => {
            try {
                await ProvisioningService.getPendingAction();
                setProvisioningStatus('success');
                navigation.toRoute('ScanQRCode', 3000);
            } catch (e) {
                setProvisioningStatus('failure');
                alert(e);
                navigation.toRoute('WifiCredentials', 2000);
            }
        }
        handleProvisioning();
    }, []);

    return (
        <Page>
            <PageBody>
                { provisioningStatus === 'pending' && <>
                    <Header>Het apparaat wordt verbonden met uw WiFi netwerk</Header>
                    <Loader style={{ margin: 60 }}/>
                    <p>Dit kan enkele seconden duren</p>
                </> }

                { provisioningStatus === 'success' && <>
                    <Header>Gelukt! Het apparaat is succesvol verbonden!</Header>
                </> }

                { provisioningStatus === 'failure' && <>
                    <Header>Er is iets mis gegaan!</Header>
                </> }
            </PageBody>
        </Page>
    )
};
