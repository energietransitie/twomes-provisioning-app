/* eslint-disable react/display-name */
import React, { FC, MouseEventHandler, ReactElement } from 'react';
import classNames from 'classnames';
import { Ripple } from '../Ripple';
import { BaseProps } from '../IBaseProps';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles<'container'|'icon', ButtonProps>((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: ({ iconPosition }) => (
            (iconPosition === 'top' && 'column-reverse')
            || (iconPosition === 'left' && 'row-reverse')
            || (iconPosition === 'bottom' && 'column')
            || 'row'),
        cursor: 'pointer',
        fontSize: 18,
        height: 40,
        padding: '0 10px',
        borderRadius: 4,
        lineHeight: 1,
        color: theme.colors.white,
        fill: theme.colors.white,
        fontWeight: 600,
        background: theme.colors.statusOK,

        '&:hover::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
        '& span+span': {
            margin: ({ iconPosition }) => (
                (iconPosition === 'top' && '0 0 8px 0')
                || (iconPosition === 'left' && '0 8px 0 0')
                || (iconPosition === 'bottom' && '8px 0 0 0')
                || '0 0 0 8px')
        }
    },
    icon: {
        display: 'flex'
    }
}));

interface ButtonProps extends BaseProps {
    label?: string | number;
    icon?: ReactElement;
    iconPosition?: 'top' | 'left' | 'bottom' | 'right';
    onClick: MouseEventHandler;
}

export const Button: FC<ButtonProps> = (props) => {
    const { className, label, icon, onClick, ...restProps } = props;
    const classes = useStyles(props);

    return (
        <Ripple>
            <div
                className={classNames(classes.container, className)}
                onClick={onClick}
                data-testid="button"
                {...restProps} >

                {label && <span>{label}</span>}
                {icon && <span className={classes.icon}>{icon}</span>}
            </div>
        </Ripple>
    );
};
