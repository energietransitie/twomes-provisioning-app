
interface AppOpenedWithDynamicLinkEvent {
    dynamicLink: string;
}

interface DynamicLink {
    root: string;
    params: Record<string, string>;
    sub?: DynamicLink;
    fullPath: string;
}

type FDLReceivedHandler = (dynamicLink: DynamicLink) => void;

export class FDLService {

    private static hasInitialised = false;
    private static handlers: FDLReceivedHandler[] = [];

    private static formatDynamicLink(fullLink: string): DynamicLink {
        const strippedLink = fullLink.replace('https://', '');
        const [root, sub] = strippedLink.split(/\/(.+)/);
        const params = root.split('?')[1]?.split('&').reduce<Record<string, string>>((accumulator, currentValue: string) => {
            const [key, value] = currentValue.split('=');
            return {
                ...accumulator,
                [key]: value
            };
        }, {});
    
        return {
            root: root.split(/\/|\?/)[0],
            params: params,
            sub: sub ? FDLService.formatDynamicLink(sub) : undefined,
            fullPath: fullLink
        }
    }

    private static appOpenedWithDynamicLinkHandler(event: Event) {
        const { dynamicLink } = event as unknown as AppOpenedWithDynamicLinkEvent;
        for (const handler of FDLService.handlers) {
            handler(FDLService.formatDynamicLink(dynamicLink));
        }
    }

    public static init(): void {
        if (!FDLService.hasInitialised) {
            FDLService.hasInitialised = true;
            window.addEventListener('AppOpenedWithDynamicLink', FDLService.appOpenedWithDynamicLinkHandler);
        }
    }

    public static onFDLReceived(handler: FDLReceivedHandler): void {
        FDLService.handlers.push(handler);
    }

    public static offFDLReceived(handler: FDLReceivedHandler): void {
        const index = FDLService.handlers.indexOf(handler);
        FDLService.handlers.splice(index, 1);
    }

}
