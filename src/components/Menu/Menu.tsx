import { isPlatform } from '@ionic/react';
import React, { VFC } from 'react';
import { Button, TimesIcon } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { AppVersionInfo } from './AppVersionInfo';
import { MenuItem } from './MenuItem';

const useStyles = makeStyles<string, { isVisible: boolean }>(theme => ({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ({ isVisible }) => isVisible ? '100%' : 0,
        height: '100%',
        zIndex: theme.zLayers.menu,
        transition: 'transform 0.3s ease-in-out',
        transform: ({ isVisible }) => isVisible ? 'translateX(0px)' : 'translateX(-300px)'
    },
    menu: {
        width: 300,
        height: '100%',
        background: theme.colors.white,
        boxShadow: theme.shadows.level1,
        paddingTop: isPlatform('ios') ? 35 : 0
    },
    outside: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 'calc(100% - 300px)',
        height: '100%',
        display: ({ isVisible }) => isVisible ? 'block' : 'none'
    },
    closeIcon: {
        background: theme.colors.white,
        width: 45,
        margin: 15
    },
    appInfo: {
        position: 'absolute',
        bottom: 10,
        left: 5
    }
}));

export type MenuItemIndex = 'main' | 'faq' | 'about' | 'privacy';
interface MenuProps {
    isVisible: boolean;
    activeIndex: MenuItemIndex;
    onCloseClick: () => void;
    onMenuItemClick: (index: MenuItemIndex) => void;
}

export const Menu: VFC<MenuProps> = (props) => {
    const { isVisible, activeIndex, onCloseClick, onMenuItemClick } = props;
    const classes = useStyles({ isVisible });

    return (
        <div className={classes.container} >
            <div className={classes.menu} >

                {/* TODO: Use close icon instead */}
                <Button
                    className={classes.closeIcon}
                    icon={<TimesIcon/>}
                    onClick={onCloseClick} />

                <MenuItem
                    style={{ fontWeight: 'bold' }}
                    index="main"
                    label="Installatie"
                    active={activeIndex === 'main'}
                    onClick={(index) => onMenuItemClick(index as MenuItemIndex)} />
                
                <MenuItem
                    index="about"
                    label="Over deze app"
                    active={activeIndex === 'about'}
                    onClick={(index) => onMenuItemClick(index as MenuItemIndex)} />

                <MenuItem
                    index="faq"
                    label="Meestgestelde vragen"
                    active={activeIndex === 'faq'}
                    onClick={(index) => onMenuItemClick(index as MenuItemIndex)} />
                
                <MenuItem
                    index="privacy"
                    label="Privacyverklaring"
                    active={activeIndex === 'privacy'}
                    onClick={(index) => onMenuItemClick(index as MenuItemIndex)} />

                <AppVersionInfo className={classes.appInfo} />

            </div>

            <div className={classes.outside} onClick={onCloseClick} ></div>
        </div>
    );
};
