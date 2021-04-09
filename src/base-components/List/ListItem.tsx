import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';
import { Ripple } from '../Ripple';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'block',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: '10px 20px',
        margin: '1px 0 0 0',
        backgroundColor: theme.colors.white
    }
}));

interface ListItemProps extends BaseProps {
    children: ReactNode;
    onClick: () => void;
};

export const ListItem: FC<ListItemProps> = (props) => {
    const {children, className, onClick, ...restProps} = props;
    const classes = useStyles();

    return (
        <Ripple>
            <div
                className={classNames(classes.container, className)}
                onClick={onClick}
                {...restProps} >
                
                {children}
            </div>
        </Ripple>
    );
};