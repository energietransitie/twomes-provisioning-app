import { ApiServiceDev } from "./__dev/ApiService";

const API_HOST = 'https://api.tst.energietransitiewindesheim.nl';

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type ActivateAccountResponse = {
    session_token: string;
}

export type ActivateDeviceResponse = {
    id: number;
    device_type: {
        name: string;
        installation_manual_url: string;
    };
};

export class ApiServiceProd {

    private static sessionToken: string;

    public static setSessionToken(token: string): void {
        ApiServiceProd.sessionToken = token;
    }

    private static async request<R extends Json>(path: string, requestBody?: Json, includeSessionToken = false): Promise<R> {
        const response = await fetch(`${API_HOST}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                ...(includeSessionToken
                    ? { Authorization: `Bearer ${ApiServiceProd.sessionToken}`}
                    : {}
                )
            },
            body: JSON.stringify(requestBody)
        });
        
        const json = await response.json();
        if (json.detail) {
            // Api Default; The json body containing a detail property indicates an error has occured.
            throw new Error(JSON.stringify(json.detail, null, '\t'))
        }
        return json;
    }

    public static async activateAccount(activation_token: string): Promise<ActivateAccountResponse> {
        const response = await ApiServiceProd.request<ActivateAccountResponse>('/account/activate', {
            activation_token
        });
        ApiServiceProd.sessionToken = response.session_token;
        return response;
    }

    public static async activateDevice(proof_of_presence_id: string): Promise<ActivateDeviceResponse> {
        return ApiServiceProd.request<ActivateDeviceResponse>('/account/device/activate', {
            proof_of_presence_id
        }, true);
    }

}

export type IApiService = InstanceType<typeof ApiServiceProd>;

export const ApiService = process.env.NODE_ENV === 'development'
    ? ApiServiceDev
    : ApiServiceProd;
