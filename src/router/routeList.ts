import { Invite, ScanQRCode, WifiList, ConnectToDevice, ProcessProvisioning, WifiCredentials } from './Pages';

export type Route = keyof typeof routeList;

export const routeList = {
    WifiList,
    ScanQRCode,
    Invite,
    ConnectToDevice,
    ProcessProvisioning,
    WifiCredentials
}