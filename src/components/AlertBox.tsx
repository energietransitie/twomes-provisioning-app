import {IonAlert} from "@ionic/react";
import React from "react";
import {isNullOrUndefined} from "util";

interface AlertProps {
    showBox: boolean,
    header?: string,
    message?: string,
    buttons?: any,
    inputs?: any,
    onDidDismiss?: any
}

const AlertBox: React.FC<AlertProps> = ({showBox, header, message, buttons, inputs, onDidDismiss}) => {

    if (showBox) {
        return (
            <IonAlert
                isOpen={showBox}
                onDidDismiss={onDidDismiss}
                header={header !== undefined && parseInt(header) === 400 ? "Fout" : header}
                message={message}
                buttons={!isNullOrUndefined(buttons) ? buttons : ["OK"]}
                inputs={inputs}
            />
        )
    }
    return null;
};

export default AlertBox;