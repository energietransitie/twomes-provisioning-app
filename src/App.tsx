import React, { FC } from 'react';
import { Router } from './router';

interface AppProps {
    authenticated?: boolean;
}

export const App: FC<AppProps> = ({ authenticated = false }) => (
    <Router startRoute={authenticated ? 'ScanQRCode' : 'Welcome'} />
);
