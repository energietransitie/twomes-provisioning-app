import React, { FC, ReactNode, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    '@keyframes ripple': {
        from: { transform: 'scale(0)', opacity: 1 },
        to: { transform: 'scale(4)', opacity: 0 }
    },
    container: {
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 400ms',
        borderRadius: 4
    },
    ripple: {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: '$ripple 600ms linear',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
});

type RippleStyles = {
    width: string;
    height: string;
    left: string;
    top: string;
}

interface RippleProps {
    children: ReactNode;
}

export const Ripple: FC<RippleProps> = (props) => {
    const { children } = props;
    const ref = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    const [ripple, setRipple] = useState<RippleStyles|undefined>();

    const handleClick = (event: React.MouseEvent): void => {
        if (ref && ref.current) {
            const boundingRect = ref.current.getBoundingClientRect();
            const diameter = Math.max(boundingRect.width, boundingRect.height);
            const radius = diameter / 2;

            setRipple({
                width: `${diameter}px`,
                height: `${diameter}px`,
                left: `${event.clientX - boundingRect.left - radius}px`,
                top: `${event.clientY - boundingRect.top - radius}px`
            });

            setTimeout(() => {
                setRipple(undefined);
            }, 600);
        }
    };

    return (
        <div className={classes.container} ref={ref} onClick={handleClick} >
            {ripple && <span className={classes.ripple} style={ripple}></span>}
            {children}
        </div>
    );
};
