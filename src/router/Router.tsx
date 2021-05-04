import React, { FC } from 'react';
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route as IonRoute} from 'react-router';
import { routeList, Route } from './routeList';

interface RouterProps {
    startRoute?: Route;
}

export const Router: FC<RouterProps> = ({ startRoute = 'Welcome'}) => (
    <IonReactRouter>
        <IonRouterOutlet>

            { Object.keys(routeList).map((key) => (
                <IonRoute
                    key={key}
                    path={`/${key}`}
                    component={routeList[key as Route]} />    
            )) }

            <Redirect exact from="/" to={`/${startRoute}`} />

        </IonRouterOutlet>
    </IonReactRouter>
);
