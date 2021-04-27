import React, { FC } from 'react';
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route as IonRoute} from 'react-router';
import { routeList, Route } from './routeList';

export const Router: FC = () => {
    const startRoute: Route = 'Welcome';

    return (
        <div>
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
        </div>
    )
};
