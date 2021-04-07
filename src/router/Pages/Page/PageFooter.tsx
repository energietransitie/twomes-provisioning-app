import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { BaseProps, PaddedContainer } from '../../../base-components';
import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

interface PageFooterProps extends BaseProps {
    children?: ReactNode;
}

export const PageFooter: FC<PageFooterProps> = (props) => {
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
