/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IpcMainInvokeEvent } from "electron";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const gamePaths: Record<string, Record<string, string | null>> = {
    "cs2": {
        windows: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive",
        macos: "/Users/Shared/Steam/steamapps/common/Counter-Strike Global Offensive",
        linux: "~/.steam/steam/steamapps/common/Counter-Strike Global Offensive"
    },
    "valorant": {
        windows: "C:\\Riot Games\\VALORANT",
        macos: null,
        linux: null
    },
    "rainbow": {
        windows: "C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy's Rainbow Six Siege",
        macos: null,
        linux: null
    },
    "apex": {
        windows: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Apex Legends",
        macos: null,
        linux: "~/.steam/steam/steamapps/common/Apex Legends"
    },
    "battlefield": {
        windows: "C:\\Program Files (x86)\\Origin Games\\Battlefield 2042",
        macos: null,
        linux: null
    },
    "pubg": {
        windows: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\PUBG",
        macos: null,
        linux: "~/.steam/steam/steamapps/common/PUBG"
    }
};


function expandHome(dir: string | null): string | null {
    return dir && dir.startsWith("~") ? path.join(os.homedir(), dir.slice(1)) : dir;
}

export async function checkInstalledGames(_: IpcMainInvokeEvent) {
    const { platform } = process;
    const osKey = platform === "win32" ? "windows" : platform === "darwin" ? "macos" : "linux";

    const installedGames: Record<string, boolean> = {};

    for (const [game, paths] of Object.entries(gamePaths)) {
        const gamePath = paths[osKey] ? expandHome(paths[osKey]) : null;
        installedGames[game] = gamePath ? fs.existsSync(gamePath) : false;
    }

    return installedGames;
}
