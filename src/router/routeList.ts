import { Invite, ScanQRCode, WifiList, ConnectToDevice } from './Pages';

export type Route = keyof typeof routeList;

export const routeList = {
    WifiList,
    ScanQRCode,
    Invite,
    ConnectToDevice
}