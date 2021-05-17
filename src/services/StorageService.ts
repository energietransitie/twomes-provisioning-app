import { Storage } from '@ionic/storage';

type StorageValue = string | number | boolean;

type Listener = (value: StorageValue) => void;

class LocalStorage {

    private store = new Storage();
    private listeners: Record<string, Listener[]> = {};

    constructor() {
        this.store.create();
    }

    public async get(key: string): Promise<StorageValue> {
        return this.store.get(key);
    }

    public async set(key: string, value: StorageValue): Promise<StorageValue> {
        if (this.listeners[key].length) {
            for(const listener of this.listeners[key]) {
                listener(value);
            }
        }
        return this.store.set(key, value);
    }

    public onChange(key: string, listener: Listener): void {
        if (!this.listeners[key]?.length) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(listener);
    }

    public offChange(key: string, listener: Listener): void {
        this.listeners[key].splice(this.listeners[key].indexOf(listener), 1);
    }

}

export const StorageService = new LocalStorage();
