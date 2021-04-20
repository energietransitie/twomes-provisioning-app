import { CameraPermisionStatus, IQRScanService } from "../QRScanService";

export class QRScanServiceDev implements IQRScanService {

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

    public static async scan(): Promise<unknown> {
        return {
            name: 'PROV_XXX',
            pop: 'abcd1234',
            transport: 'ble',
            security: 1
        }
    }

    public static stopScan(): void {
        return;
    }
}
