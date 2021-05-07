import {
    Welcome,
    Invite,
    ScanQRCode,
    Instructions,
    ConnectToDevice,
    WifiList,
    WifiCredentials,
    ProcessProvisioning,
    RequestPermissions
} from './Pages';

export type Route = keyof typeof routeList;

export const routeList = {
    Welcome,
    Invite,
    ScanQRCode,
    Instructions,
    ConnectToDevice,
    WifiList,
    WifiCredentials,
    ProcessProvisioning,
    RequestPermissions
}