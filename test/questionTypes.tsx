/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Checkbox, cl } from "../util/utils";

export interface Question {
    id: string;
    title: string;
    component: React.FC<{
        value: any;
        onChange: (value: any) => void;
    }>;
    requireInput?: boolean;
}


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




export const LikertQuestion: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: string[];
}> = ({ value, onChange, options }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", color: "var(--text-normal)" }}>
            {options.map((option, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <button
                        onClick={() => onChange(index.toString())}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: value === index.toString() ? "var(--button-secondary-background-active)" : "transparent",
                            border: "2px solid var(--button-secondary-background-active)",
                            cursor: "pointer",
                        }}
                    />
                    <span style={{ fontSize: "12px", textAlign: "center" }}>{option}</span>
                </div>
            ))}
        </div>
    );
};


export const RankingQuestion: React.FC<{
    value: string;
    onChange: (value: string) => void;
    items: string[];
}> = ({ value, onChange, items }) => {
    const ranks = value ? value.split(",").map(Number) : items.map((_, i) => i);

    const moveItem = (index: number, direction: "up" | "down") => {
        if ((direction === "up" && index === 0) ||
            (direction === "down" && index === ranks.length - 1)) {
            return;
        }

        const newRanks = [...ranks];
        const swapIndex = direction === "up" ? index - 1 : index + 1;

        [newRanks[index], newRanks[swapIndex]] = [newRanks[swapIndex], newRanks[index]];
        onChange(newRanks.join(","));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            <div style={{ marginBottom: "8px", color: "var(--text-normal)", fontSize: "14px" }}>
                Use the arrows to rank items by importance:
            </div>
            {ranks.map((itemIndex, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s ease"
                    }}
                >
                    <span style={{
                        minWidth: "24px",
                        color: "var(--text-normal)",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}>{index + 1}.</span>
                    <div style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "var(--background-secondary)",
                        border: "1px solid var(--background-tertiary)",
                        borderRadius: "3px",
                        color: "var(--text-normal)",
                        fontSize: "14px",
                        userSelect: "none",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                    }}>
                        {items[itemIndex]}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <button
                            onClick={() => moveItem(index, "up")}
                            disabled={index === 0}
                            className={cl("test-move-up")}
                            style={{
                                opacity: index === 0 ? 0.5 : 1,
                                padding: "4px 8px",
                                borderRadius: "4px",
                                backgroundColor: "var(--button-secondary-background)",
                                border: "none"
                            }}
                            aria-label="Move item up"
                        >
                            ↑
                        </button>
                        <button
                            onClick={() => moveItem(index, "down")}
                            disabled={index === ranks.length - 1}
                            className={cl("test-move-down")}
                            style={{
                                opacity: index === ranks.length - 1 ? 0.5 : 1,
                                padding: "4px 8px",
                                borderRadius: "4px",
                                backgroundColor: "var(--button-secondary-background)",
                                border: "none"
                            }}
                            aria-label="Move item down"
                        >
                            ↓
                        </button>
                    </div>
                </div>
            ))}
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>
                Place your most important item at the top
            </div>
        </div>
    );
};
