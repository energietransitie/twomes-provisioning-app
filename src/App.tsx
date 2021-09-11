import React, { FC, useEffect, useState } from 'react';
import { ErrorModal } from './components/ErrorModal';
import { Menu, MenuItemIndex } from './components/Menu';
import { AppHeader } from './components/AppHeader';
import { Router } from './router';
import { ErrorModals, ErrorModalService } from './services/ErrorModalService';
import { makeStyles } from './theme/makeStyles';
import { IFramePortal } from './components/IFramePortal';

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
    const [activeView, setActiveView] = useState<MenuItemIndex>('main');
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

    const handleMenuItemClick = (index: MenuItemIndex) => {
        setActiveView(index);
        setMenuIsVisible(false);
    }

    return (
        <div className={classes.container} >
            
            <AppHeader onMenuClick={toggleMenu} />
            <Menu
                isVisible={menuIsVisible}
                activeIndex={activeView}
                onCloseClick={toggleMenu}
                onMenuItemClick={handleMenuItemClick} />

            { activeView === 'about'
                ? <IFramePortal
                    index="about"
                    src="https://www.energietransitiewindesheim.nl/assendorp2021/about/" />
                : null}
            { activeView === 'faq'
                ? <IFramePortal
                    index="faq"
                    src="https://www.energietransitiewindesheim.nl/assendorp2021/FAQ/" />
                : null}
            { activeView === 'privacy'
                ? <IFramePortal
                    index="privacy"
                    src="https://www.energietransitiewindesheim.nl/assendorp2021/privacy.html" />
                : null}

            <Router authenticated={authenticated} />

            { errorModals.map((modalProps, index) => <ErrorModal key={index} {...modalProps} />) }
        </div>
    )
};
