/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { API_URL } from "./utils";

export async function getIq(id: string) {
    await fetch(API_URL + "/iq", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id
        })
    })
        .then(response => response.json())
        .then(data => { return data; })
        .catch(error => console.error("Error:", error));
}


export function submitTest(id: string, answers) {
    fetch(API_URL + "/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            answers
        })
    })
        .then(response => response.json())
        .then(data => { return data; })
        .catch(error => console.error("Error:", error));

}
