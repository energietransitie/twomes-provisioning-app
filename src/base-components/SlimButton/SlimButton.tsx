import classNames from 'classnames';
import React, { FC } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        cursor: 'pointer',
        textDecoration: 'underline',
        color: theme.colors.blueLighter
    }
}));

interface SlimButtonProps extends BaseProps {
    label?: string;
    onClick: () => void;
}

export const SlimButton: FC<SlimButtonProps> = (props) => {
    const { label, className, ...restProps } = props;
    const classes = useStyles();
    
    return (
        <div
            className={classNames(classes.container, className)}
            {...restProps} >

            <span>{label}</span>
        </div>
    );
};
