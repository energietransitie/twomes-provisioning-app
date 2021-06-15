import { CameraPermisionStatus, IQRScanService, QRCodeJson } from "../QRScanService";

export class QRScanServiceDev implements IQRScanService {

    private static styleNode: HTMLStyleElement;
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
                QRScanServiceDev.QRCodeJson = {
                    name: 'PROV_XXX',
                    pop: 'abcd1234',
                    transport: 'ble',
                    security: 1
                };
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
