import { Invite, ScanQRCode, WifiList, ConnectToDevice, ProcessProvisioning } from './Pages';

export type Route = keyof typeof routeList;

export const routeList = {
    WifiList,
    ScanQRCode,
    Invite,
    ConnectToDevice,
    ProcessProvisioning
}