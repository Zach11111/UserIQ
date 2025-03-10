/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import ErrorBoundary from "@components/ErrorBoundary";
import { useEffect, useState } from "@webpack/common";

import { cl, getUserIq, } from "./utils";

export const UserIQDecorator = ErrorBoundary.wrap(({ userId }) => {
    const [iq, setIq] = useState<number | null>(null);

    useEffect(() => {
        let isSubscribed = true;

        const fetchIq = async () => {
            try {
                const generatedIq = await getUserIq(userId);
                if (isSubscribed) {
                    setIq(generatedIq);
                }
            } catch (error) {
                console.error("Failed to fetch IQ:", error);
            }
        };

        fetchIq();

        return () => {
            isSubscribed = false;
        };
    }, [userId]);

    if (!iq) return null;

    return (
        <span className={cl("iq-box")}>
            <div className={cl("iq-text")}>
                {iq} IQ
            </div>
        </span>
    );
});
