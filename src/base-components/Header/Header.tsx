import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        color: theme.colors.grey900,
    },
    h1: { fontSize: 24, fontWeight: 'bold' },
    h2: { fontSize: 20, fontWeight: 'normal' },
    h3: { fontSize: 16, fontWeight: 'bold' },
    h4: { fontSize: 14, fontWeight: 'bold' },
    h5: { fontSize: 12, fontWeight: 'normal' },
    h6: { fontSize: 10, fontWeight: 'normal' }
}));

type HeaderSize = 'h1'|'h2'|'h3'|'h4'|'h5'|'h6';
// type HeaderSizesMap = {
//     [key in HeaderSize]?: boolean;
// }
interface HeaderProps extends BaseProps {
    children?: ReactNode;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    h4?: boolean;
    h5?: boolean;
    h6?: boolean;
}

export const Header: FC<HeaderProps> = (props) => {
    const { children, className, ...restProps } = props;
    const classes = useStyles();

    const headingFromProps = (props: HeaderProps): HeaderSize => {
        return Object.keys(props).find(key => /h[1-6]\b/.test(key)) as HeaderSize || 'h1';
    };

    const combinedClassNames = classNames(
        classes.container,
        classes[headingFromProps(props)],
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
