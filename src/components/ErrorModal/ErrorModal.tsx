import React, { FC } from 'react';
import { Modal } from '../../base-components/Modal';
import { makeStyles } from '../../theme/makeStyles';

const useStyles = makeStyles(theme => ({
    errorMessage: {
        margin: '20px 0',
        padding: 10,
        background: theme.colors.grey200,
        color: theme.colors.grey800,
        fontStyle: 'italic'
    }
}));

export interface ErrorModalProps {
    error: string | Error;
    callback?: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = (props) => {
    const { error, callback } = props;
    const classes = useStyles();

    const handleSubmit = () => {
        callback?.();
    };

    const errorMessage = typeof error === 'string' ? error : error.message;

    return (
        <Modal title='Er is een fout opgetreden' onSubmit={handleSubmit}>
            Er lijkt onverwachts iets fout te zijn gegaan.
            
            <div className={classes.errorMessage}>
                {errorMessage}
            </div>

            Probeer het opnieuw of neem contact op met onze klantenservice.

            <p>
                <a href="mailto:warmtewachter-support@windesheim.nl" >warmtewachter-support@windesheim.nl</a>
            </p>
        </Modal>
    );
};
