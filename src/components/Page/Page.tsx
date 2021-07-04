import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { PaddedContainer } from '../../base-components';
import { BaseProps } from '../../base-components/IBaseProps';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        background: `linear-gradient(to top right, ${theme.colors.greenLighter}, ${theme.colors.green}, ${theme.colors.greenDarker})`,
        padding: 25
    },
    body: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        background: theme.colors.white,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto'
    }
}));

interface PageProps extends BaseProps {
    children?: ReactNode;
}

export const Page: FC<PageProps> = (props) => {
    const { children, className } = props;
    const classes = useStyles();

    return (
        <PaddedContainer className={ classNames(classes.container, className) } >
            <div className={classes.body} >
                {children}
            </div>
        </PaddedContainer>
    );
};
