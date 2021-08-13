import React, { FC, useEffect, useState } from 'react';
import { ErrorModal } from './components/ErrorModal';
import { Menu } from './components/Menu';
import { AppHeader } from './components/AppHeader';
import { Router } from './router';
import { ErrorModals, ErrorModalService } from './services/ErrorModalService';
import { makeStyles } from './theme/makeStyles';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
})

interface AppProps {
    authenticated?: boolean;
}

export const App: FC<AppProps> = ({ authenticated = false }) => {
    const [errorModals, setErrorModals] = useState<ErrorModals>([]);
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const handleErrorModalsChange = (modals: ErrorModals) => {
            setErrorModals([...modals]);
        }
        ErrorModalService.onChange(handleErrorModalsChange);

        return () => {
            ErrorModalService.offChange(handleErrorModalsChange);
        }
    }, []);

    const toggleMenu = () => {
        setMenuIsVisible(isVisible => !isVisible);
    }

    return (
        <div className={classes.container} >
            <AppHeader onMenuClick={toggleMenu} />
            <Menu isVisible={menuIsVisible} onOutsideClick={toggleMenu} />

            <Router authenticated={authenticated} />

            { errorModals.map((modalProps, index) => <ErrorModal key={index} {...modalProps} />) }
        </div>
    )
};
