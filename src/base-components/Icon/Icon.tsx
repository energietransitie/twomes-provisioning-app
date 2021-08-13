import React, { FC } from 'react';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles({
    container: {
        minWidth: 25
    }
});

export interface IconProps {
    color?: string;
}

export const Icon: FC<IconProps> = (props) => {
    const { children } = props;
    const classes = useStyles();

    return (
        <div className={classes.container} >
            {children}
        </div>
    );
};
