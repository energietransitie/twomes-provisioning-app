import { BleDeviceQRJson, CameraPermisionStatus, IQRScanService, QRCodeJson } from "../QRScanService";

export const DUMMY_QR_DATA: BleDeviceQRJson = {
    name: 'TWOMES-A0FEB2',
    pop: 'abcd1234',
    transport: 'ble',
    security: 1
};

export class QRScanServiceDev implements IQRScanService {

    private static QRCodeJson: QRCodeJson = DUMMY_QR_DATA;

    public static async getCameraPermissionStatus(): Promise<CameraPermisionStatus> {
        return CameraPermisionStatus.Granted;
    }

    public static async requestCameraPermission(): Promise<void> {
        return;
    }

    public static prepareQRScan(): void {
        return;
    }

    public static unprepareQRScan(): void {
        return;
    }

    public static async scan(): Promise<QRCodeJson> {
        QRScanServiceDev.QRCodeJson = DUMMY_QR_DATA;
        return QRScanServiceDev.QRCodeJson;
    }

    public static getQRCodeJson(): QRCodeJson {
        return QRScanServiceDev.QRCodeJson;
    }

    public static stopScan(): void {
        return;
    }
}
