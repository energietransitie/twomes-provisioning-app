import {IonLoading} from '@ionic/react';
import React from 'react';

interface LoadingProps {
    showLoading: boolean
}

const LoadingComponent : React.FC<LoadingProps> = ({showLoading}) => {
    //Loading component for use throughout the application
    return (
        <IonLoading
            isOpen={showLoading}
            message={'Een ogenblik geduld...'}
        />
    )
}

export default LoadingComponent;