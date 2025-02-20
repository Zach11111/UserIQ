/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { openModal } from "@utils/modal";
import { OptionType } from "@utils/types";
import { Button } from "@webpack/common";

import { TestModal } from "./test";

export const settings = definePluginSettings({
    authorize: {
        type: OptionType.COMPONENT,
        component: () => (
            <Button onClick={() => authorize()}>
                Take the IQ test
            </Button>
        )
    },
});


function authorize() {
    openModal(props => (
        <TestModal rootProps={props} />
    ));
}
