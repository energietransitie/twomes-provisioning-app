import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles({
    container: {
        width: '100%',
        padding: 15
    }
});

interface PaddedContainerProps extends BaseProps {
    children: ReactNode;
}

export const PaddedContainer: FC<PaddedContainerProps> = (props) => {
    const { children, className } = props;
    const classes = useStyles();

    return (
        <div className={classNames(classes.container, className)} >
            {children}
        </div>
    );
};
