import { Storage } from '@ionic/storage';

type StorageValue = string | number | boolean;

class LocalStorage {

    private store = new Storage();

    constructor() {
        this.store.create();
    }

    public async get(key: string): Promise<StorageValue> {
        return this.store.get(key);
    }

    public async set(key: string, value: StorageValue): Promise<StorageValue> {
        return this.store.set(key, value);
    }

}

export const StorageService = new LocalStorage();
