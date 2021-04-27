import React, { FC } from 'react';
import { Button } from '../../base-components';
import { useNavigation } from '../useNavigation';
import { Page, PageBody, PageFooter} from './Page';

export const Invite: FC = () => {
    const navigation = useNavigation();

    return (
        <Page>
            <PageBody>
                <p>In de mail uitnodiging die u heeft ontvangen staat een activatielink.</p>
                <br/>
                <p>Klik op deze link om te beginnen met de installatie van uw meetapparaten.</p>
            </PageBody>

            <PageFooter>
                <Button label="Ik ben een tester" onClick={() => navigation.toRoute('ScanQRCode') } ></Button>
            </PageFooter>
        </Page>
    );
};
