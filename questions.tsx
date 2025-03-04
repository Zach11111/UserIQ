/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button, SearchableSelect, Slider, TextInput } from "@webpack/common";

import { Checkbox, Native, scoreGames } from "./utils";

export interface Question {
    id: string;
    title: string;
    component: React.FC<{
        value: string;
        onChange: (value: any) => void;
    }>;
}

export const TextQuestion: React.FC<{ value: string; onChange: (value: string) => void; placeholder: string; }> = ({ value, onChange, placeholder }) => (
    <TextInput
        value={value}
        onChange={e => onChange(e)}
        placeholder={placeholder}
    />
);

export const BingoQuestion: React.FC<{
    value: string;
    onChange: (value: string) => void;
    items: string[];
}> = ({ value, onChange, items }) => {
    const checked = value && value.trim() !== "" ? value.split(",").map(Number) : [];

    const toggleItem = (index: number) => {
        const newChecked = checked.includes(index)
            ? checked.filter(i => i !== index)
            : [...checked, index];
        onChange(newChecked.join(","));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", color: "white" }}>
            {items.map((item, index) => (
                <label key={index} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <Checkbox
                        value={checked.includes(index)}
                        onChange={() => toggleItem(index)}
                        style={{ width: 24, height: 24 }}
                    >
                        {item}
                    </Checkbox>
                </label>
            ))}
        </div>
    );
};

export const MultipleChoiceQuestion: React.FC<{ value: string; onChange: (value: string) => void; options: { value: string; label: string; }[]; }> = ({ value, onChange, options }) => (
    <SearchableSelect
        options={options}
        value={options.find(o => o.value === value)}
        placeholder={"Select an option"}
        maxVisibleItems={5}
        closeOnSelect={true}
        onChange={v => onChange(v)}
    />
);


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
                onValueChange={v => onChange(v.toString())}
            />
        )
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
        )
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
        )
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
                hideBubble={true}
            />
        )
    }
];

