/**
 * @file The settings tab of the application.
 */
import React, { useState, createContext, useContext, useEffect } from "react";
import { Slider } from "@mui/material";

import type { GameSettings } from "../game/buttonGame";
import type { ProgressionPoints } from "../game/progression";
import { progressionPoints } from "../game/progression";
import { SizeAndSpeedSetting } from "../game/settings/sizeAndSpeed";
import { AutoclickSetting } from "../game/settings/autoclick";

// Create a settings context and provider for use throughout the application.
/**
 * @file The settings of the application.
 */
// prettier-ignore
export type Settings = GameSettings & {
    /**
     * Set the value of a setting.
     * @param key - The key of the setting.
     * @param value - The value of the setting.
     */
    readonly set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;

    // Progression points
    progress: ProgressionPoints;
};

/**
 * The settings of the application.
 */
//@ts-expect-error - The settings context is not yet initialized.
export const SettingsContext = createContext<Settings>(undefined);

/**
 * Use the settings context.
 * @returns The settings of the application.
 */
export const useSettings = (): Settings => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({
        set: (key, value) => setSettings((prev) => ({ ...prev, [key]: value })),

        // Game settings
        speed: 100,
        size: 15,
        autoClick: false,

        // Progression points
        progress: Object.fromEntries(progressionPoints.map((point) => [point, false])) as ProgressionPoints,
    });

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

/**
 * Check if a progression point is required.
 * @param point - The progression point to check.
 * @returns Whether the progression point is required.
 */
// export const requiresProgression = (point: keyof ProgressionPoints) => {
//     const settings = useSettings();
//     return settings["progress"][point] === true;
// };

/**
 * Set a progression point.
 * @param point - The progression point to set.
 */
// export const setProgression = (point: ProgressionPoints) => {
//     const settings = useSettings();
//     settings.set("progress", point);
// };

// Declare the tab for the settings of the application.
/**
 * @returns The settings tab of the application.
 */
export const SettingsTab: React.FC = () => {
    const settings = useSettings();

    // Debug
    useEffect(() => {
        (window as typeof window & { settings: Settings }).settings = settings;
    }, [settings]);

    return (
        <div className="w-1/5 tab overflow-y-auto">
            <h1 className="text-3xl font-bold text-center">Settings</h1>
            <hr />

            <SizeAndSpeedSetting />
            <AutoclickSetting />
        </div>
    );
};
