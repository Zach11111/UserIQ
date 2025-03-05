/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DataStore } from "@api/index";
import { proxyLazy } from "@utils/lazy";
import { openModal } from "@utils/modal";
import { OAuth2AuthorizeModal, UserStore, zustandCreate, zustandPersist } from "@webpack/common";

import { AUTHORIZE_URL, CLIENT_ID } from "../util/utils";


const indexedDBStorage = {
    async getItem(name: string): Promise<string | null> {
        return DataStore.get(name).then(v => v ?? null);
    },
    async setItem(name: string, value: string): Promise<void> {
        await DataStore.set(name, value);
    },
    async removeItem(name: string): Promise<void> {
        await DataStore.del(name);
    },
};

interface AuthorizationState {
    token: string | null;
    tokens: Record<string, string>;
    init: () => void;
    authorize: () => Promise<void>;
    setToken: (token: string) => void;
    remove: (id: string) => void;
    isAuthorized: () => boolean;
}

export const useAuthorizationStore = proxyLazy(() => zustandCreate(
    zustandPersist(
        (set: any, get: any) => ({
            token: null,
            tokens: {},
            init: () => { set({ token: get().tokens[UserStore.getCurrentUser().id] ?? null }); },
            setToken: (token: string) => set({ token, tokens: { ...get().tokens, [UserStore.getCurrentUser().id]: token } }),
            remove: (id: string) => {
                const { tokens, init } = get();
                const newTokens = { ...tokens };
                delete newTokens[id];
                set({ tokens: newTokens });

                init();
            },
            async authorize() {
                return new Promise((resolve, reject) => openModal(props =>
                    <OAuth2AuthorizeModal
                        {...props}
                        scopes={["identify"]}
                        responseType="code"
                        redirectUri={AUTHORIZE_URL}
                        permissions={0n}
                        clientId={CLIENT_ID}
                        cancelCompletesFlow={false}
                        callback={async (response: any) => {
                            try {
                                const url = new URL(response.location);
                                url.searchParams.append("client", "vencord");

                                const req = await fetch(url);

                                if (req?.ok) {
                                    const { token } = await req.json();
                                    get().setToken(token);
                                    console.log(token);
                                } else {
                                    throw new Error("Request not OK");
                                }
                                resolve(void 0);
                            } catch (error) {
                                console.error("Error fetching token:", error);
                            }
                        }}

                    />, {
                    onCloseCallback() {
                        reject(new Error("Authorization cancelled"));
                    },
                }
                ));
            },
            isAuthorized: () => !!get().token,
        } as AuthorizationState),
        {
            name: "useriq-auth",
            storage: indexedDBStorage,
            partialize: state => ({ tokens: state.tokens }),
            onRehydrateStorage: () => state => state?.init()
        }
    )
));
