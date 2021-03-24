import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { BaseProps, PaddedContainer } from '../../../base-components';
import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles(theme => ({
    container: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.grey800
    }
}));

interface PageHeaderProps extends BaseProps {
    children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
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
