/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DataStore } from "@api/index";
import { proxyLazy } from "@utils/lazy";
import { zustandCreate, zustandPersist } from "@webpack/common";

const indexedDBStorage = {
    async getItem(name: string): Promise<string | null> {
        const value = await DataStore.get(name);
        console.log("Getting from storage:", name, value);
        return value || null; // Remove JSON.stringify here
    },
    async setItem(name: string, value: string): Promise<void> {
        console.log("Setting to storage:", name, value);
        await DataStore.set(name, value); // Remove JSON.parse here
    },
    async removeItem(name: string): Promise<void> {
        await DataStore.del(name);
    },
};


interface IQStore {
    iqMap: Record<string, number>;
    init: () => void;
    setIQ: (id: string, iq: number) => void;
    getIQ: (id: string) => number | null;
}

export const useIQStore = proxyLazy(() => zustandCreate(
    zustandPersist(
        (set: any, get: any) => ({
            iqMap: {},
            init: () => { set({ iqMap: get().iqMap }); },
            setIQ: (id: string, iq: number) => {
                const currentMap = get().iqMap;
                set({ iqMap: { ...currentMap, [id]: iq } });
            },
            getIQ: (id: string) => {
                const currentMap = get().iqMap;
                return currentMap[id] ?? null;
            }
        } as IQStore),
        {
            name: "useriq-iq",
            storage: indexedDBStorage,
            onRehydrateStorage: () => state => state?.init(),
            partialize: (state: any) => ({
                iqMap: state.iqMap
            })
        }
    )
));
