import classNames from 'classnames';
import React, { VFC } from 'react';
import { CheckIcon, Loader, MinusIcon, TimesIcon } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles<string, { status: StatusType }>(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        lineHeight: 1
    },
    statusIcon: {
        display: 'flex',
        justifyContent: 'center',   
        width: 50,
        height: 40,

        '& svg': {
            width: 30
        }
    },
    loaderIcon: {
        transform: 'scale(0.8, 0.6)'
    },
    label: {
        marginLeft: 15,
        color: ({ status }) => status === 'not-started' ? theme.colors.grey500 : theme.colors.black
    }
}));

export type StatusType = 'not-started' | 'pending' | 'success' | 'failure';

export interface ActionStatusProps {
    status: StatusType;
    label: string;
    className?: string;
};

export const ActionStatus: VFC<ActionStatusProps> = (props) => {
    const { status, label, className } = props;
    const classes = useStyles({ status });

    return (
        <div className={classNames(classes.container, className)} >
            <div className={classes.statusIcon} >
                { status === 'not-started' && <MinusIcon color="#999999" />}
                { status === 'pending' && <Loader className={classes.loaderIcon} />}
                { status === 'success' && <CheckIcon />}
                { status === 'failure' && <TimesIcon />}
            </div>

            <div className={classes.label} >{label}</div>
        </div>
    );
}