import React, { FC, useEffect, useState } from 'react';
import { ErrorModal } from './components/ErrorModal';
import { Router } from './router';
import { ErrorModals, ErrorModalService } from './services/ErrorModalService';

interface AppProps {
    authenticated?: boolean;
}

export const App: FC<AppProps> = ({ authenticated = false }) => {
    const [errorModals, setErrorModals] = useState<ErrorModals>([]);

    useEffect(() => {
        const handleErrorModalsChange = (modals: ErrorModals) => {
            setErrorModals([...modals]);
        }
        ErrorModalService.onChange(handleErrorModalsChange);

        return () => {
            ErrorModalService.offChange(handleErrorModalsChange);
        }
    }, []);

    console.log('MARCO render', errorModals);

    return (
        <>
            <Router authenticated={authenticated} />

            { errorModals.map((modalProps, index) => <ErrorModal key={index} {...modalProps} />) }
        </>
    )
};
