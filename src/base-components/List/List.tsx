import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows.level1,
        width: '100%'
    }
}));

interface ListProps extends BaseProps {
    children: ReactNode;
};

export const List: FC<ListProps> = (props) => {
    const { children, className, ...restProps } = props;
    const classes = useStyles();

    return (
        <div
            className={classNames(classes.container, className)}
            {...restProps} >

            { children }
        </div>
    );
};
