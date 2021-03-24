import React, { FC } from 'react';
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';

import { Invite, ScanQRCode } from './Pages';

export const Router: FC = () => {
    return (
        <div>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/ScanQRCode" component={ScanQRCode} />
                    <Route path="/invite" component={Invite} />
                    <Redirect exact from="/" to="/ScanQRCode" />
                </IonRouterOutlet>
            </IonReactRouter>
        </div>
    )
};
