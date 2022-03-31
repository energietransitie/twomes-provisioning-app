import { ApiServiceDev } from "./__dev/ApiService";

const API_HOST = 'https://api.energiebeveiliging.nl';

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type ActivateAccountResponse = {
    session_token: string;
}

export type ActivateDeviceResponse = {
    id: number;
    name: string;
    device_type: {
        name: string;
        display_name: string;
        installation_manual_url: string;
    }
};

export type DeviceTypeResponse = {
    name: string;
    display_name: string;
    installation_manual_url: string;
}

export type DeviceResponse = {
    id: number;
    name: string;
    device_type: {
        name: string;
        display_name: string;
        installation_manual_url: string;
    }
    latest_measurement_timestamp: string | null;
}

export class ApiServiceProd {

    private static sessionToken: string;

    public static setSessionToken(token: string): void {
        ApiServiceProd.sessionToken = token;
    }

    private static async request<R extends Json>(method: 'GET' | 'POST' | 'PUT', path: string, params?: { body?: Json }, includeSessionToken = false): Promise<R> {
        const response = await fetch(`${API_HOST}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                ...(includeSessionToken
                    ? { Authorization: `Bearer ${ApiServiceProd.sessionToken}`}
                    : {}
                )
            },
            body: JSON.stringify(params?.body)
        });
        
        const json = await response.json();
        if (json.detail) {
            // Api Default; The json body containing a detail property indicates an error has occured.
            throw new Error(JSON.stringify(json.detail, null, '\t'))
        }
        return json;
    }

    public static async activateAccount(activation_token: string): Promise<ActivateAccountResponse> {
        const response = await ApiServiceProd.request<ActivateAccountResponse>('POST', '/account/activate', {
            body: { activation_token }
        });
        ApiServiceProd.sessionToken = response.session_token;
        return response;
    }

    public static async activateDevice(activation_token: string): Promise<ActivateDeviceResponse> {
        return ApiServiceProd.request<ActivateDeviceResponse>('POST', '/account/device/activate', {
            body: { activation_token }
        }, true);
    }

    public static async getInstallationManual(device_name: string): Promise<DeviceTypeResponse> {
        return ApiServiceProd.request<DeviceTypeResponse>('GET', `/device_type/${device_name}`, {}, true);
    }

    public static async getDevice(device_name: string): Promise<DeviceResponse> {
        return ApiServiceProd.request<DeviceResponse>('GET', `/device/${device_name}`, {}, true);
    }

}

export type IApiService = InstanceType<typeof ApiServiceProd>;

export const ApiService = process.env.NODE_ENV === 'development'
    ? ApiServiceDev
    : ApiServiceProd;
