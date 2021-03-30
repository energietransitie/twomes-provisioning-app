import classNames from 'classnames';
import React, { FC } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    '@keyframes fx': {
        '50%': { transform: 'scale(1)', opacity: 1 },
        '100%': { transform: 'scale(0)', opacity: 0 }
    },
    container: {
        display: 'flex'
    },
    dot: {
        display: 'block',
        height: '.75rem',
        width: '.75rem',
        border: `2px solid ${theme.colors.black}`,
        margin: '.25rem',
        borderRadius: '100%',
        animation: '$fx 1s ease infinite',
        transform: 'scale(0)',
    },
    delay300: {
        animationDelay: '0.3s'
    },
    delay600: {
        animationDelay: '0.6s'
    }
}));

type LoaderProps = BaseProps;

export const Loader: FC<LoaderProps> = (props) => {
    const { className } = props;
    const classes = useStyles();

    return (
        <div className={classNames(classes.container, className)} >
            <span className={classes.dot} ></span>
            <span className={classNames(classes.dot, classes.delay300)} ></span>
            <span className={classNames(classes.dot, classes.delay600)} ></span>
        </div>
    );
};
