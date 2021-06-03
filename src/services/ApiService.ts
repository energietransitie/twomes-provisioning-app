const API_HOST = 'https://api.tst.energietransitiewindesheim.nl';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

type ActivateAccountResponse = {
    session_token: string;
}

type ActivateDeviceResponse = {
    id: number;
    device_type: {
        name: string;
        installation_manual_url: string;
    };
};

export class ApiService {

    private static sessionToken: string;

    private static async request<R extends Json>(path: string, requestBody?: Json, includeSessionToken = false): Promise<R> {
        const response = await fetch(`${API_HOST}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(includeSessionToken
                    ? { Authorization: `Bearer ${ApiService.sessionToken}`}
                    : {}
                )
            },
            body: JSON.stringify(requestBody)
        });
        
        const json = await response.json();
        if (json.detail) {
            // Api Default; The json body containing a detail property indicates an error has occured.
            throw new Error(JSON.stringify(json.detail))
        }
        return json;
    }

    public static async activateAccount(activation_token: string): Promise<ActivateAccountResponse> {
        const response = await ApiService.request<ActivateAccountResponse>('/account/activate', {
            activation_token
        });
        ApiService.sessionToken = response.session_token;
        return response;
    }

    public static async activateDevice(proof_of_presence_id: string): Promise<ActivateDeviceResponse> {
        return ApiService.request<ActivateDeviceResponse>('/account/device/activate', {
            proof_of_presence_id
        }, true);
    }

}
