/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { openModal } from "@utils/modal";
import { OptionType } from "@utils/types";
import { Button, showToast } from "@webpack/common";

import { useAuthorizationStore } from "../stores/authStore";
import { TestModal } from "../test/test";
import { hasUserTakenTest } from "./utils";

export const settings = definePluginSettings({
    authorize: {
        type: OptionType.COMPONENT,
        component: () => (
            <><Button onClick={() => useAuthorizationStore.getState().authorize()}>
                Authorize
            </Button><Button onClick={() => authorize()}>
                    take test
                </Button></>
        )
    },
});


function authorize() {
    if (hasUserTakenTest()) {
        showToast("You have already taken the IQ test.");
        return;
    }

    if (!useAuthorizationStore.getState().isAuthorized()) {
        showToast("You must authorize to take the IQ test.");
        return;
    }

    openModal(props => (
        <TestModal rootProps={props} />
    ), {
        onCloseRequest: () => {
            showToast("You must complete the IQ test to continue using Vencord.",);
        }
    });

}


