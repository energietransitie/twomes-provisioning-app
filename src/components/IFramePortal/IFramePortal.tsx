import { isPlatform } from '@ionic/react';
import React, { VFC } from 'react';
import { Portal } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        top: isPlatform('ios') ? 85 : 50, // AppHeader Correction
        left: 0,
        height: isPlatform('ios') ? 'calc(100% - 85px)' : 'calc(100% - 50px)', // AppHeader Correction
        background: theme.colors.white
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none'
    }
}));

interface IFramePortalProps {
    src: string;
    index: string;
}

export const IFramePortal: VFC<IFramePortalProps> = (props) => {
    const { src, index } = props;
    const classes = useStyles();

    return (
        <Portal name={index} className={classes.container} >
            
            <iframe
                className={classes.iframe}
                src={src}>
            </iframe>

        </Portal>
    )
};
