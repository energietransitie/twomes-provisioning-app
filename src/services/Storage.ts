import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

export function LocalStorage() {
    async function getItem(key: string) {
        const {value}  = await Storage.get({key: key});
        return value;
    }

    async function setItem(key: string, value: string) {
        await Storage.set({key: key, value: value});
    }

    return {
        getItem: getItem,
        setItem: setItem,
    }
}

