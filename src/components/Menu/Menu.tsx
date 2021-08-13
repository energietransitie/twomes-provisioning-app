import React, { VFC } from 'react';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles<string, { isVisible: boolean }>(theme => ({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ({ isVisible }) => isVisible ? '100%' : 0,
        height: '100%',
        zIndex: 1,
        transition: 'transform 0.3s ease-in-out',
        transform: ({ isVisible }) => isVisible ? 'translateX(0px)' : 'translateX(-300px)',
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: '100%',
        background: theme.colors.white,
        boxShadow: theme.shadows.level1
    },
    outside: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 'calc(100% - 300px)',
        height: '100%',
        display: ({ isVisible }) => isVisible ? 'block' : 'none'
    }
}));

interface MenuProps {
    isVisible: boolean;
    onOutsideClick: () => void;
}

export const Menu: VFC<MenuProps> = (props) => {
    const { isVisible, onOutsideClick } = props;
    const classes = useStyles({ isVisible });

    return (
        <div className={classes.container} >
            <div className={classes.menu} >
                
            </div>

            <div className={classes.outside} onClick={onOutsideClick} ></div>
        </div>
    );
};
