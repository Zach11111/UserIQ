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
        return value || null;
    },
    async setItem(name: string, value: string): Promise<void> {
        await DataStore.set(name, value);
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
    setAllIQs: (newIQMap: Record<string, number>) => void;
}

export const useIQStore = proxyLazy(() =>
    zustandCreate(
        zustandPersist(
            (set: any, get: any) => ({
                iqMap: {},
                init: () => {
                    const storedIQMap = get().iqMap;
                    set({ iqMap: storedIQMap || {} });
                },
                setIQ: (id: string, iq: number) => {
                    const currentMap = get().iqMap;
                    const newMap = { ...currentMap, [id]: iq };
                    set({ iqMap: newMap });
                },
                getIQ: (id: string) => {
                    const iq = get().iqMap[id] ?? null;
                    return iq;
                },
                setAllIQs: (newIQMap: Record<string, number>) => {
                    set({ iqMap: newIQMap });
                }
            } as IQStore),
            {
                name: "useriq-iq",
                storage: indexedDBStorage,
                partialize: (state: any) => ({
                    iqMap: state.iqMap,
                }),
                onRehydrateStorage: () => state => {
                    if (state) {
                        state.init();
                    }
                },
            }
        )
    )
);
