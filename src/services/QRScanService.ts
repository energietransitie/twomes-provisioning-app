
import { Plugins } from '@capacitor/core';
import { QRScanServiceDev } from './__dev/QRScanService';

const { BarcodeScanner } = Plugins;

export enum CameraPermisionStatus {
    Granted = 'granted',
    Denied = 'denied',
    NeverAsked = 'neverAsked',
    Unknown = 'unknown'
}

export interface BleDeviceQRJson {
    name: string;
    pop: string;
    transport: "ble";
    security?: 0 | 1; // 0 = unsecure, 1 = secure
}

export interface SoftAPDeviceQRJson {
    name: string;
    pop: string;
    transport: "softap";
    security?: 0 | 1; // 0 = unsecure, 1 = secure
    password?: string;
}

export type QRCodeJson = BleDeviceQRJson | SoftAPDeviceQRJson;

class QRScanServiceProd {

    private static styleNode: HTMLStyleElement;
    private static QRCodeJson: QRCodeJson;

    public static async getCameraPermissionStatus(): Promise<CameraPermisionStatus> {
        const status = await BarcodeScanner.checkPermission({ force: false });
        switch(Object.keys(status)[0]) {
            case 'granted':
                return CameraPermisionStatus.Granted;
            case 'denied':
            case 'restricted':
            case 'unknown':
                return CameraPermisionStatus.Denied;
            case 'neverAsked':
                return CameraPermisionStatus.NeverAsked;
            default:
                return CameraPermisionStatus.Unknown;
        }
    }

    public static async requestCameraPermission(): Promise<void> {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (!status.granted) {
            throw new Error(status);
        }
    }

    public static prepareQRScan(): void {
        QRScanServiceProd.styleNode = document.createElement('style');
        document.head.appendChild(QRScanServiceProd.styleNode);
        (QRScanServiceProd.styleNode.sheet as CSSStyleSheet).insertRule('#root { opacity: 0 }');
    }

    public static unprepareQRScan(): void {
        QRScanServiceProd.styleNode && document.head.removeChild(QRScanServiceProd.styleNode);
    }

    public static async scan(): Promise<QRCodeJson> {
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan({ targetedFormats: ['QR_CODE'] })
        BarcodeScanner.showBackground();
        QRScanServiceProd.QRCodeJson = JSON.parse(result.content);
        return QRScanServiceProd.QRCodeJson;
    }

    public static getQRCodeJson(): QRCodeJson {
        return QRScanServiceProd.QRCodeJson;
    }

    public static stopScan(): void {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
    }
}

export type IQRScanService = InstanceType<typeof QRScanServiceProd>;

export const QRScanService = process.env.NODE_ENV === 'development'
    ? QRScanServiceDev
    : QRScanServiceProd;