/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";
import { PluginNative } from "@utils/types";
import { findComponentByCodeLazy } from "@webpack";

export const cl = classNameFactory("useriq");

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const ShinyButton = findComponentByCodeLazy(".onlyShineOnHover");
export const Checkbox = findComponentByCodeLazy(".checkboxWrapperDisabled:");

export const Native = VencordNative.pluginHelpers.UserIQ as PluginNative<typeof import("./native")>;


export function scoreGames(games) {
    let score: number = 0;
    if (games.cs2) {
        score += 1;
    }
    if (games.valorant) {
        score += 3;
    }
    if (games.rainbow) {
        score += 2;
    }
    if (games.apex) {
        score += 2;
    }
    if (games.battlefield) {
        score += 1;
    }
    if (games.pubg) {
        score += 2;
    }
    return score;
}
