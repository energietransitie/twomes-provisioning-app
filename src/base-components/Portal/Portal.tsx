import classNames from 'classnames';
import { FC, ReactNode, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '../../theme/makeStyles';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: theme.zLayers.portal
    },
    content: {
        width: '100%',
        height: '100%',
        position: 'relative'
    }
}));

interface PortalProps extends BaseProps {
    children?: ReactNode;
    name: string;
}

export const Portal: FC<PortalProps> = (props) => {
    const { children, className, name } = props;
    const classes = useStyles();
    const [portalNode, setPortalNode] = useState<HTMLDivElement>();

    useEffect(() => {
        const portalNode = document.createElement('div');
        portalNode.id = name;
        portalNode.className = classNames(classes.container, className);

        const portalContentNode = document.createElement('div');
        portalContentNode.className = classNames(classes.content);

        document.body.appendChild(portalNode)
        setPortalNode(portalNode);

        // Cleanup
        return () => {
            document.body.removeChild(portalNode);
        }
    }, []);
    
    return portalNode ? ReactDOM.createPortal(children, portalNode) : null;
}