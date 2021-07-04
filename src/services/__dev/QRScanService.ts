import { BleDeviceQRJson, CameraPermisionStatus, IQRScanService, QRCodeJson } from "../QRScanService";

export const DUMMY_QR_DATA: BleDeviceQRJson = {
    name: 'TWOMES-A0FEB2',
    pop: 'abcd1234',
    transport: 'ble',
    security: 1
};

export class QRScanServiceDev implements IQRScanService {

    private static styleNode: HTMLStyleElement;
    private static QRCodeJson: QRCodeJson = DUMMY_QR_DATA;

    public static async getCameraPermissionStatus(): Promise<CameraPermisionStatus> {
        return CameraPermisionStatus.Granted;
    }

    public static async requestCameraPermission(): Promise<void> {
        return;
    }

    public static prepareQRScan(): void {
        QRScanServiceDev.styleNode = document.createElement('style');
        document.head.appendChild(QRScanServiceDev.styleNode);
        (QRScanServiceDev.styleNode.sheet as CSSStyleSheet).insertRule('#root { opacity: 0 }');
        (QRScanServiceDev.styleNode.sheet as CSSStyleSheet).insertRule('body { background: black }');
    }

    public static unprepareQRScan(): void {
        QRScanServiceDev.styleNode && document.head.removeChild(QRScanServiceDev.styleNode);
    }

    public static async scan(): Promise<QRCodeJson> {
        return new Promise((resolve) => {
            setTimeout(() => {
                QRScanServiceDev.QRCodeJson = DUMMY_QR_DATA;
                resolve(QRScanServiceDev.QRCodeJson);
            }, 3000);
        });
    }

    public static getQRCodeJson(): QRCodeJson {
        return QRScanServiceDev.QRCodeJson;
    }

    public static stopScan(): void {
        return;
    }
}
