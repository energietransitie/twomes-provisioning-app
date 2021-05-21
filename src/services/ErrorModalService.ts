import { ErrorModalProps } from "../components/ErrorModal";

type OnErrorHandler = (modals: ErrorModalProps[]) => void;

export type ErrorModals = ErrorModalProps[];

export class ErrorModalService {

    private static modals: ErrorModals = [];
    private static handlers: OnErrorHandler[] = [];

    private static handleChange() {
        for (const handler of ErrorModalService.handlers ) {
            handler(ErrorModalService.modals);
        }
    }

    private static handleCallback = (params: ErrorModalProps): void => {
        const errorModalIndex = ErrorModalService.modals.findIndex(({ error }) => error === params.error);
        ErrorModalService.modals.splice(errorModalIndex, 1);
        params.callback?.();
        ErrorModalService.handleChange();
    };

    public static showErrorModal = (params: ErrorModalProps): void => {
        ErrorModalService.modals = [...ErrorModalService.modals, {
            ...params,
            callback: () => ErrorModalService.handleCallback(params)
        }];
        ErrorModalService.handleChange();
    };

    public static onChange(handler: OnErrorHandler): void {
        ErrorModalService.handlers.push(handler);
    }

    public static offChange(handler: OnErrorHandler): void {
        ErrorModalService.handlers.splice(ErrorModalService.handlers.indexOf(handler), 1);
    }

}
