import React, { FC } from 'react';
import classNames from 'classnames';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

import { StyleRules } from '@material-ui/styles';

const headingStyles = {
    h1: { fontSize: 24, fontWeight: 'bold' },
    h2: { fontSize: 20, fontWeight: 'normal' },
    h3: { fontSize: 16, fontWeight: 'bold' },
    h4: { fontSize: 14, fontWeight: 'bold' },
    h5: { fontSize: 12, fontWeight: 'normal' },
    h6: { fontSize: 10, fontWeight: 'normal' }
}

const useStyles = makeStyles(theme => ({
    container: {
        color: theme.colors.grey900,
    },
    ...headingStyles as StyleRules
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OneKey<K extends string, V = any> = {
    [P in K]: (Record<P, V> &
        Partial<Record<Exclude<K, P>, never>>) extends infer O
            ? { [Q in keyof O]: O[Q] }
            : never
}[K];

type HeaderKey = keyof typeof headingStyles;
type HeaderProps = BaseProps & Partial<OneKey<HeaderKey, true>>;

export const Header: FC<HeaderProps> = (props) => {
    const { children, className, ...restProps } = props;
    const classes = useStyles();

    const getHeaderKeyFromProps = (props: HeaderProps): HeaderKey => {
        return Object.keys(props).find((key) => !!key.match(/h[1-6]/)) as HeaderKey || 'h1';
    }

    const combinedClassNames = classNames(
        classes.container,
        classes[getHeaderKeyFromProps(props)],
        className
    );

    return (
        <div
            className={combinedClassNames}
            {...restProps} >

            {children}
        </div>
    )
};
