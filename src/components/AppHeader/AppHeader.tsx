import React, { VFC } from 'react';
import { Button, Header } from '../../base-components';
import { HamburgerIcon } from '../../base-components/Icon';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        background: theme.colors.white,
        alignItems: 'center',
        boxShadow: theme.shadows.level1,
        zIndex: theme.zLayers.appHeader,
        padding: 5
    },
    button: {
        background: theme.colors.white,
        marginRight: 10
    }
}));

interface AppHeaderProps {
    onMenuClick: () => void;
}

export const AppHeader: VFC<AppHeaderProps> = (props) => {
    const { onMenuClick } = props;
    const classes = useStyles();

    return (
        <div className={classes.container} >

            <Button
                className={classes.button}
                icon={<HamburgerIcon/>}
                onClick={onMenuClick}/>

            <Header h3>WarmteWachter</Header>

        </div>
    );
};
