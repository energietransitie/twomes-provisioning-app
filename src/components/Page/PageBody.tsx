import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { BaseProps, PaddedContainer } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column'
    }
});

interface PageBodyProps extends BaseProps {
    children?: ReactNode;
}

export const PageBody: FC<PageBodyProps> = (props) => {
    const { children, className, ...restProps } = props;
    const classes = useStyles();

    return (
        <PaddedContainer
            className={classNames(classes.container, className)}
            {...restProps} >

            { children }
        </PaddedContainer>
    );
};
