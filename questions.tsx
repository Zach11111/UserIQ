/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button, SearchableSelect, Slider, TextInput } from "@webpack/common";

export interface Question {
    id: string;
    title: string;
    component: React.FC<{
        value: string;
        onChange: (value: string) => void;
    }>;
}

export const TextQuestion: React.FC<{ value: string; onChange: (value: string) => void; placeholder: string; }> = ({ value, onChange, placeholder }) => (
    <TextInput
        value={value}
        onChange={e => onChange(e)}
        placeholder={placeholder}
    />
);

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
        id: "agi",
        title: "What's the full meaning of AGI?",
        component: props => (
            <TextQuestion {...props} placeholder="Type your answer" />
        )
    },
    {
        id: "test",
        title: "What's 2+2?",
        component: props => (
            <MultipleChoiceQuestion
                {...props}
                options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }]}
            />
        )
    },
    {
        id: "ShortFormContent",
        title: "How many hours do you spend watching Short form content everyday?",
        component: ({ value, onChange }) => (
            <Slider
                markers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                minValue={0}
                maxValue={12}
                stickToMarkers={true}
                initialValue={parseInt(value) || 0}
                onValueChange={v => onChange(v.toString())}
            />
        )
    },
    {
        id: "test2",
        title: "testing",
        component: ({ value, onChange }) => (
            <Button onClick={() => onChange("test")}>
                Click me
            </Button>
        )
    }
];
