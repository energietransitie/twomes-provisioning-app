import React, { FC } from 'react';
import { SlimButton } from '../base-components';
import { useNavigation } from '../router/useNavigation';
import { Page, PageBody, PageFooter} from '../components/Page';

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
                <SlimButton label="Vorige pagina" onClick={() => navigation.toRoute('Welcome') } ></SlimButton>
            </PageFooter>
        </Page>
    );
};
