import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

// Service to expose LocalStorage

export function LocalStorage() {

    //Get item from Storage
    async function getItem(key: string) {
        const {value}  = await Storage.get({key: key});
        return value;
    }

    //Set item to Storage
    async function setItem(key: string, value: string) {
        await Storage.set({key: key, value: value});
    }

    return {
        getItem: getItem,
        setItem: setItem,
    }
}

