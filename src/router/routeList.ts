import {
    Welcome,
    Invite,
    ScanQRCode,
    Instructions,
    ConnectToDevice,
    WifiList,
    WifiCredentials,
    ProcessProvisioning,
    RequestLocationPermissions,
    RequestCameraPermissions
} from '../Pages';

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
    RequestLocationPermissions,
    RequestCameraPermissions
}