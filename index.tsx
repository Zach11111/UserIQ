/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./util/styles.css";

import { addMemberListDecorator, removeMemberListDecorator } from "@api/MemberListDecorators";
import { addMessageDecoration, removeMessageDecoration } from "@api/MessageDecorations";
import definePlugin from "@utils/types";

import { useIQStore } from "./stores/iqStore";
import { UserIQDecorator } from "./util/iqDecorator";
import { settings } from "./util/settings";
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
    dependencies: ["MessageDecorationsAPI", "MemberListDecoratorsAPI"],
    settings,
    patches: [],
    // It might be likely you could delete these and go make patches above!
    start() {
        console.log("UserIQ started");
        useIQStore.getState().init();
        addMessageDecoration("useriq", ({ message }) => <UserIQDecorator userId={message.author.id} />);
        addMemberListDecorator("useriq", ({ user }) => <UserIQDecorator userId={user.id} />);
    },
    stop() {
        removeMemberListDecorator("useriq");
        removeMessageDecoration("useriq");
    }
});



