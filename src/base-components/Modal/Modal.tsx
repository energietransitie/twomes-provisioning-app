import React, { FC, MouseEventHandler, ReactNode } from "react";
import { makeStyles } from "../../theme/makeStyles";
import { Button } from "../Button";
import { Header } from "../Header";
import { Portal } from "../Portal";
import { SlimButton } from "../SlimButton";

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        minHeight: 250,
        maxWidth: 500,
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        boxShadow: theme.shadows.level1
    },
    modalTitle: {
        padding: 15
    },
    modalBody: {
        padding: '0 20px'
    },
    modalControls: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: '15px 10px'
    }
}));

interface ModalProps {
    title: string;
    children: ReactNode;
    submitText?: string;
    onSubmit?: () => void;
    cancelText?: string;
    onCancel?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
    const { title, children, submitText = "Begrepen", onSubmit, cancelText = "Annuleren", onCancel } = props;
    const classes = useStyles();

    const blockOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
    }

    return (
        <Portal name="modal" >
            <div className={classes.container} onClick={blockOutsideClick} >
                <div className={classes.modalContainer} >
                    <Header h2 className={classes.modalTitle} >{ title }</Header>
                    <div className={classes.modalBody} >{ children }</div>

                    <div className={classes.modalControls} >
                        {onCancel && <SlimButton label={cancelText} onClick={() => { /***/ }} />}
                        <Button label={submitText} onClick={() => { /***/ }} />
                    </div>
                </div>
            </div>
        </Portal>
    );
};
