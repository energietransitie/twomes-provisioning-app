import React, { FC, useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route as IonRoute} from 'react-router';
import { routeList, Route } from './routeList';
import { StorageService, StorageValue } from '../services/StorageService';
import { makeStyles } from '../theme/makeStyles';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        flexGrow: 1
    }
});

interface RouterProps {
    className?: string;
    authenticated?: boolean;
}

export const Router: FC<RouterProps> = (props) => {
    const { authenticated = false } = props;
    const [hasAuthenticated, setHasAuthenticated] = useState(authenticated);

    const classes = useStyles();
    
    const startRoute: Route = hasAuthenticated ? 'ScanQRCode' : 'Welcome';
    const noAuthRoutes: Route[] = ['Welcome', 'Invite'];

    useEffect(() => {
        const handleAuthChange = (token: StorageValue) => {
            const currentRoute = window.location.pathname.replace('/', '') as Route;
            if (!!token && noAuthRoutes.includes(currentRoute)) {
                setHasAuthenticated(true);
            }
        }

        StorageService.onChange('token', handleAuthChange);

        return () => {
            StorageService.offChange('token', handleAuthChange);
        }
    }, []);

    useEffect(() => {
        const handleBackButton = (e: Event) => {
            e.preventDefault();
        }
        document.addEventListener('backbutton', handleBackButton);

        return () => {
            document.removeEventListener('backbutton', handleBackButton);
        }
    }, [])
    
    return (
        <div className={classes.container} >
            <IonReactRouter>
                <IonRouterOutlet>

                    { Object.keys(routeList).map((key) => (
                        <IonRoute
                            key={key}
                            path={`/${key}`}
                            component={routeList[key as Route]} />
                    )) }

                    { hasAuthenticated ? noAuthRoutes.map((route) => (
                        <Redirect key={route} exact from={`/${route}`} to={`/${startRoute}`} />
                    )): <React.Fragment/> /* Return Fragment due to weird ReactRouter behaviour */ }

                    <Redirect exact from="/" to={`/${startRoute}`} />

                </IonRouterOutlet>
            </IonReactRouter>
        </div>
    );
};
