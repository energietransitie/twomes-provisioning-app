import { CameraPermisionStatus, IQRScanService, QRCodeJson } from "../QRScanService";

export class QRScanServiceDev implements IQRScanService {

    private static QRCodeJson: QRCodeJson = {
        name: 'PROV_XXX',
        pop: 'abcd1234',
        transport: 'ble',
        security: 1
    };

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
        QRScanServiceDev.QRCodeJson = {
            name: 'PROV_XXX',
            pop: 'abcd1234',
            transport: 'ble',
            security: 1
        };
        return QRScanServiceDev.QRCodeJson;
    }

    public static getQRCodeJson(): QRCodeJson {
        return QRScanServiceDev.QRCodeJson;
    }

    public static stopScan(): void {
        return;
    }
}
