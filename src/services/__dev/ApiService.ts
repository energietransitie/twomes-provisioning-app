import { ActivateAccountResponse, ActivateDeviceResponse, DeviceResponse, DeviceTypeResponse, IApiService, ProvisionDeviceResponse } from "../ApiService";

export const DUMMY_DEVICE_TYPE = {
    name: 'Generic-Test',
    display_name: 'testapparaatje',
    installation_manual_url: 'https://energietransitiewindesheim.nl/manuals/Generic-Test/'
}

export class ApiServiceDev implements IApiService {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static setSessionToken(token: string): void {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async activateAccount(activation_token: string): Promise<ActivateAccountResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    session_token: 'abcde12345'
                });
            }, 100);
        });
    }

    public static async provisionDevice(name: string, type: string, pop: string): Promise<ProvisionDeviceResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: 'TWOMES-AAAAAA',
                    device_type: DUMMY_DEVICE_TYPE,
                    activation_token: "qwertyuiopasdfghjkl",
                    activated_on: new Date(),
                    created_on: new Date()
                })
            })
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async activateDevice(activation_token: string): Promise<ActivateDeviceResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: 'TWOMES-A0FEB2',
                    device_type: DUMMY_DEVICE_TYPE
                });
            }, 500);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async getInstallationManual(device_name: string): Promise<DeviceTypeResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(DUMMY_DEVICE_TYPE);
            }, 100);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async getDevice(device_name: string): Promise<DeviceResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: 'TWOMES-A0FEB2',
                    device_type: DUMMY_DEVICE_TYPE,
                    latest_measurement_timestamp: '2021-06-07T08:09:59.809Z'
                });
            }, 100);
        });
    }

}
