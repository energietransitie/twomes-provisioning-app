import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        color: theme.colors.grey900,
        fontSize: 24,
        fontWeight: 'bold'
    }
}));

interface HeaderProps extends BaseProps {
    children?: ReactNode;
}

export const Header: FC<HeaderProps> = (props) => {
    const { children, className, ...restProps } = props;
    const classes = useStyles();

    return (
        <div
            className={classNames(classes.container, className)}
            {...restProps} >

            {children}
        </div>
    )
};
