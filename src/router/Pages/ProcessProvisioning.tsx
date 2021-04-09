import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Header, Loader } from "../../base-components";
import { ProvisioningService } from "../../services/ProvisioningService";
import { Page, PageBody } from "./Page";

type ProvisioningStatus = 'pending' | 'failure' | 'success';

export const ProcessProvisioning: FC = () => {
    const history = useHistory();
    const [provisioningStatus, setProvisioningStatus] = useState<ProvisioningStatus>('pending');

    useEffect(() => {
        const handleProvisioning = async () => {
            try {
                await ProvisioningService.getPendingAction();
                setProvisioningStatus('success');
                setRedirectTimeout();
            } catch (e) {
                setProvisioningStatus('failure');
                throw e;
            }
        }
        handleProvisioning();
    }, []);

    const setRedirectTimeout = () => {
        setTimeout(() => {
            history.push('/ScanQRCode');
        }, 2000);
    };

    return (
        <Page>
            <PageBody>
                { provisioningStatus === 'pending' && <>
                    <Header>Het apparaat wordt verbonden met uw WiFi netwerk</Header>
                    <Loader/>
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
