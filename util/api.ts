/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { GuildStore, UserStore } from "@webpack/common";

import { useAuthorizationStore } from "../stores/authStore";
import { API_URL } from "./utils";

export async function getIq(id: string) {
    try {
        const response = await fetch(API_URL + "/iq", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": useAuthorizationStore.getState().token,
                "userid": id
            },
        });
        const data = await response.json();
        return data.iq;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function submitTest(id: string, testAnswers) {

    const answers = {
        ...testAnswers,
        vanityUrlNum: Object.values(GuildStore.getGuilds()).filter(g => g.vanityURLCode && g.ownerId === UserStore.getCurrentUser().id).length
    };


    try {
        const response = await fetch(API_URL + "/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": useAuthorizationStore.getState().token,
                "userid": UserStore.getCurrentUser().id
            },
            body: JSON.stringify({ id, answers })
        });
        const data = await response.json();
        return data.score;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getAllIQs() {
    const response = await fetch(API_URL + "/iqs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}
