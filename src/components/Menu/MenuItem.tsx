import classNames from 'classnames';
import React, { VFC } from 'react';
import { BaseProps, Ripple } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles<'container', { active: boolean }>(theme => ({
    container: {
        padding: '15px 20px',
        borderLeft: ({ active }) => active ? `6px solid ${theme.colors.green}` : 'none'
    }
}));

interface MenuItemProps extends BaseProps {
    index: string;
    onClick: (index: string) => void;
    label: string;
    active: boolean;
}

export const MenuItem: VFC<MenuItemProps> = (props) => {
    const { index, onClick, label, active, className, ...restProps } = props;
    const classes = useStyles({ active });

    return (
        <Ripple>
            <div
                className={classNames(classes.container, className)}
                onClick={() => onClick(index)}
                {...restProps} >

                {label}
            </div>
        </Ripple>
    );
};
