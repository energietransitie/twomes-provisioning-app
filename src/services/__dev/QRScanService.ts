export class QRScanServiceDev {

    private static styleNode: HTMLStyleElement;

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
