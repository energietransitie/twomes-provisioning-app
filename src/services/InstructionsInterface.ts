
// Interface for the Instructions Components
export interface InstructionsInterface {
    stepUpFunction?: any,
    stepBackFunction?: any,
    finishFunction?: any,
    lastStep?: boolean,
    wifiFunction?: any,
    wifiSSID?: string,
    wifiPassword?: string,
    checkHardwareID?: boolean,
    router: HTMLIonRouterOutletElement | null;

}