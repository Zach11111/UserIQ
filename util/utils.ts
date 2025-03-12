/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";
import { PluginNative } from "@utils/types";
import { findComponentByCodeLazy } from "@webpack";
import { UserStore } from "@webpack/common";

import { useIQStore } from "../stores/iqStore";
import { getAllIQs } from "./api";


export const cl = classNameFactory("vc-useriq-");

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const ShinyButton = findComponentByCodeLazy(".onlyShineOnHover");
export const Checkbox = findComponentByCodeLazy(".checkboxWrapperDisabled:");

export const Native = !IS_WEB ? VencordNative.pluginHelpers.UserIQ as PluginNative<typeof import("../native")> : null;

export function scoreGames(games: Record<string, boolean>): number {
    const scores: Record<string, number> = {
        cs2: 1,
        valorant: 3,
        rainbow: 2,
        apex: 2,
        battlefield: 1,
        pubg: 2,
        fortnite: 3,
        genshin: 5
    };

    return Object.keys(scores).reduce(
        (score, game) => score + (games[game] ? scores[game] : 0),
        0
    );
}


export const API_URL = "https://useriq.garythe.cat";
export const AUTHORIZE_URL = API_URL + "/auth/discord/callback";
export const CLIENT_ID = "1344869727188680785";



export async function getUserIq(userId) {
    const storeIQ = useIQStore.getState().getIQ(userId);
    if (storeIQ) {
        return storeIQ;
    } else {
        return null;
    }
}

export function hasUserTakenTest() {
    return useIQStore.getState().getIQ(UserStore.getCurrentUser().id.toString()) !== null;
}


export async function UpdateAllIqs() {
    const iqs = await getAllIQs();

    useIQStore.getState().setAllIQs(iqs);
}
