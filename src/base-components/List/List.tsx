import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 25,

        '& > *': {
            borderBottom: `1px solid ${theme.colors.grey300}`,

            '&:last-of-type': {
                border: 'none'
            }
        }
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
