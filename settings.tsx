/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { openModal } from "@utils/modal";
import { OptionType } from "@utils/types";
import { Button, showToast } from "@webpack/common";

import { useAuthorizationStore } from "./auth";
import { TestModal } from "./test";

export const settings = definePluginSettings({
    authorize: {
        type: OptionType.COMPONENT,
        component: () => (
            <Button onClick={() => useAuthorizationStore.getState().authorize()}>
                Authorize
            </Button>
        )
    },
});


function authorize() {
    openModal(props => (
        <TestModal rootProps={props} />
    ), {
        onCloseRequest: () => {
            showToast("You must complete the IQ test to continue using Vencord.",);
        }
    });
}



