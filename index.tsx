/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { openModal } from "@utils/modal";
import definePlugin from "@utils/types";

import { settings } from "./settings";
import { TestModal } from "./test";
export default definePlugin({
    name: "UserIQ",
    description: "A plugin that shows a users iq next to their name",
    authors: [
        {
            id: 683550738198036516n,
            name: "Zach Orange",
        },
        {
            id: 871764313914871888n,
            name: "CreeperITA104",
        },
    ],
    settings,
    patches: [],
    // It might be likely you could delete these and go make patches above!
    start() {
        openModal(props => (
            <TestModal rootProps={props} />
        ), {
            // onCloseRequest: () => {
            //     showToast("You must complete the IQ test to continue using Vencord.",);
            // }
        });
    },
    stop() { },
});
