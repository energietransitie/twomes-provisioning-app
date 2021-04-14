
import { Plugins } from '@capacitor/core';
import { QRScanServiceDev } from './__dev/QRScanService';

const { BarcodeScanner } = Plugins;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).BarcodeScanner = BarcodeScanner;

class QRScanServiceProd {

    private static styleNode: HTMLStyleElement;

    public static prepareQRScan(): void {
        this.styleNode = document.createElement('style');
        document.head.appendChild(this.styleNode);
        (this.styleNode.sheet as CSSStyleSheet).insertRule('#root { opacity: 0 }');
    }

    public static unprepareQRScan(): void {
        document.head.removeChild(this.styleNode);
    }

    public static async scan(): Promise<unknown> {
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
        BarcodeScanner.showBackground();
        return JSON.parse(result.content);
    }

    public static stopScan(): void {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).QRScanService = QRScanServiceProd;

export const QRScanService = process.env.NODE_ENV === 'development'
    ? QRScanServiceDev
    : QRScanServiceProd;