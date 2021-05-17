import React, { FC, useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route as IonRoute} from 'react-router';
import { routeList, Route } from './routeList';
import { StorageService } from '../services/StorageService';
import { useNavigation } from './useNavigation';

interface RouterProps {
    authenticated?: boolean;
}

export const Router: FC<RouterProps> = (props) => {
    const { authenticated = 'false' } = props;
    const navigation = useNavigation();
    
    const startRoute: Route = authenticated ? 'ScanQRCode' : 'Welcome';
    const noAuthRoutes: Route[] = ['Welcome', 'Invite'];

    useEffect(() => {
        StorageService.onChange('token', (token) => {
            const currentRoute = window.location.pathname.replace('/', '') as Route;
            if (!!token && noAuthRoutes.includes(currentRoute)) {
                navigation.toRoute('ScanQRCode');
            }
        });
    }, [])
    
    return (
        <IonReactRouter>
            <IonRouterOutlet>

                { Object.keys(routeList).map((key) => (
                    <IonRoute
                        key={key}
                        path={`/${key}`}
                        component={routeList[key as Route]} />    
                )) }

                { authenticated && noAuthRoutes.map((route) => (
                    <Redirect exact from={`/${route}`} to={`/${startRoute}`} />
                ))}

                <Redirect exact from="/" to={`/${startRoute}`} />

            </IonRouterOutlet>
        </IonReactRouter>
    );
};
