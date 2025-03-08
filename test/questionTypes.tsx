/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SearchableSelect, TextInput } from "@webpack/common";

import { Checkbox } from "../util/utils";

export interface Question {
    id: string;
    title: string;
    component: React.FC<{
        value: any;
        onChange: (value: any) => void;
    }>;
    requireInput?: boolean;
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


export const SingleChoiceQuestion: React.FC<{
    value: string;
    onChange: (value: string) => void;
    items: string[];
}> = ({ value, onChange, items }) => {
    const checked = value && value.trim() !== "" ? value.split(",").map(Number) : [];

    const toggleItem = (index: number) => {
        onChange(index.toString());
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




