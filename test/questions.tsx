/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button, Slider } from "@webpack/common";

import { Native, scoreGames } from "../util/utils";
import { BingoQuestion, Question } from "./questionTypes";

export const questions: Question[] = [
    {
        id: "sleep",
        title: "How many hours did you stay awake yesterday?",
        component: ({ value, onChange }) => (
            <Slider
                markers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
                minValue={0}
                maxValue={24}
                stickToMarkers={true}
                initialValue={parseInt(value) || 0}
                onValueChange={v => onChange(v)}
            />
        ),
        requireInput: true
    },
    {
        id: "discordBingo",
        title: "Terminally Online Bingo (Check all that apply)",
        component: props => (
            <BingoQuestion
                {...props}
                items={[
                    "I've had a sleep schedule ruined by Discord",
                    "I've been in a voice call for more than 8 hours straight",
                    "I've argued with a stranger over something dumb",
                    "I have custom emojis that only I understand",
                    "I feel phantom Discord pings even when I'm not online"
                ]}
            />
        ),
        requireInput: false
    },
    {
        id: "games",
        title: "We will now detect what games you have installed on your computer. Please click the button below to continue.",
        component: ({ value, onChange }) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={async () => {
                    const games = await Native.checkInstalledGames();
                    const score = scoreGames(games);

                    onChange(score);
                }}>Detect games</Button>
            </div>
        ),
        requireInput: true
    },
    {
        id: "genshin",
        title: "How much money have you spent on Genshin Impact in the past month?",
        component: ({ value, onChange }) => (
            <Slider
                markers={[0, 20, 50, 100, 200, 300, 500]}
                minValue={0}
                maxValue={500}
                stickToMarkers={false}
                initialValue={parseInt(value) || 0}
                onValueChange={v => onChange(v.toString())}
                hideBubble={false}
            />
        ),
        requireInput: true
    }
];

