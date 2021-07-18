/* eslint-disable react/display-name */
import React, { VFC, MouseEventHandler, ReactElement, MouseEvent } from 'react';
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
        fontSize: 18,
        minHeight: 40,
        padding: '5px 10px',
        borderRadius: 4,
        lineHeight: 1,
        color: theme.colors.white,
        fill: theme.colors.white,
        fontWeight: 600,
        background: ({ disabled }) => disabled ? theme.colors.grey700 : theme.colors.statusOK,
        justifyContent: 'center',
        textAlign: 'center',

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
    disabled?: boolean;
    label?: string | number;
    icon?: ReactElement;
    iconPosition?: 'top' | 'left' | 'bottom' | 'right';
    onClick: MouseEventHandler;
}

export const Button: VFC<ButtonProps> = (props) => {
    const { className, label, icon, onClick, disabled = false, ...restProps } = props;
    const classes = useStyles(props);

    const handleClick = (e: MouseEvent) => {
        !disabled && onClick(e);
    }

    return (
        <Ripple>
            <div
                className={classNames(classes.container, className)}
                onClick={handleClick}
                data-testid="button"
                {...restProps} >

                {label && <span>{label}</span>}
                {icon && <span className={classes.icon}>{icon}</span>}
            </div>
        </Ripple>
    );
};
