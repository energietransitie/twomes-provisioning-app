import classNames from 'classnames';
import React, { FC } from 'react';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '80vw',
        height: '80vw',
        display: 'flex',
        flexWrap: 'wrap',
    },
    edge: {
        width: '25vw',
        height: '25vw',
        background: 'transparent',
        borderColor: 'rgba(255,255,255,0.6)',
        borderWidth: 5
    },
    topLeft: {
        borderTopStyle: 'solid',
        borderLeftStyle: 'solid',
        margin: '0 15vw 15vw 0'
    },
    topRight: {
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        margin: '0 0 15vw 15vw'
    },
    bottomLeft: {
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        margin: '15vw 15vw 0 0'
    },
    bottomRight: {
        borderBottomStyle: 'solid',
        borderRightStyle: 'solid',
        margin: '15vw 0 0 15vw'
    }
});

interface QRScanBoundariesProps {
    className?: string;
}

export const QRScanBoundaries: FC<QRScanBoundariesProps> = (props) => {
    const { className } = props;
    const classes = useStyles();

    return (
        <div className={classNames(classes.container, className)}>
            <span className={classNames(classes.edge, classes.topLeft)} ></span>
            <span className={classNames(classes.edge, classes.topRight)} ></span>
            <span className={classNames(classes.edge, classes.bottomLeft)} ></span>
            <span className={classNames(classes.edge, classes.bottomRight)} ></span>
        </div>
    );
};
