import { ActivateAccountResponse, ActivateDeviceResponse, IApiService } from "../ApiService";

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
            }, 1000);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async activateDevice(proof_of_presence_id: string): Promise<ActivateDeviceResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    device_type: {
                        name: 'Generic-Test',
                        installation_manual_url: 'https://energietransitiewindesheim.nl/twomes/installation_instruction/generic_test.html'
                    }
                });
            }, 1000);
        });
    }

}
