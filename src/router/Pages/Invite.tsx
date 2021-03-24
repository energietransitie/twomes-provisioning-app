import React, { FC } from 'react';
import { Page, PageBody, PageFooter, PageHeader } from './Page';

export const Invite: FC = () => {
    return (
        <Page>
            <PageHeader>Page Header</PageHeader>
            
            <PageBody>
                Page Body
            </PageBody>

            <PageFooter>Page Footer</PageFooter>
        </Page>
    );
};
