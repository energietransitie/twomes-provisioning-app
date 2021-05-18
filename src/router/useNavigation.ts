import { useHistory } from 'react-router';
import { Route } from './routeList';

interface Navigation {
    toRoute: (route: Route, delay?: number) => void;
}

export const useNavigation = (): Navigation => {
    const history = useHistory();

    return {
        
        toRoute: (route, delay = 0) => {
            setTimeout(() => {
                history.push(`/${route}`);
            }, delay);
        }

    };
};
