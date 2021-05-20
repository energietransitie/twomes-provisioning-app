import React, { FC } from 'react';
import { Modal } from './base-components/Modal';
import { Router } from './router';

interface AppProps {
    authenticated?: boolean;
}

export const App: FC<AppProps> = ({ authenticated = false }) => {
    return (
        <>
            <Router authenticated={authenticated} />
            <Modal title='Er is een fout opgetreden' onCancel={() => {/** */}} >
                Er lijkt onverwachts iets fout te zijn gegaan.
                Probeer het opnieuw of neem contact op met onze klantenservice.

                <p>
                    <a href="mailto:warmtewachter-support@windesheim.nl" >warmtewachter-support@windesheim.nl</a>
                </p>
            </Modal>
        </>
    )
};
