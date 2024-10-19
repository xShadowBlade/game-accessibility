/**
 * @file The settings tab of the application.
 */
import React, { useState, createContext, useContext, useEffect } from "react";
import { Slider } from "@mui/material";

import type { GameSettings } from "../game/buttonGame";

// Create a settings context and provider for use throughout the application.
/**
 * @file The settings of the application.
 */
export type Settings = GameSettings & {
    /**
     * Set the value of a setting.
     * @param key - The key of the setting.
     * @param value - The value of the setting.
     */
    readonly set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;

    test: number;
    test2: string;
}

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
        set: (key, value) => setSettings({ ...settings, [key]: value }),
        test: 0,
        test2: "test",

        // Game settings
        speed: 100,
        size: 10,
        autoClick: false,
    });

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

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
            <h1 className="text-3xl font-bold underline">Settings</h1>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Test</h2>
                <Slider
                    value={settings.test}
                    onChange={(_, value) => settings.set("test", value)}
                    min={0}
                    max={100}
                    step={1}
                />
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Test 2</h2>
                <input
                    type="text"
                    value={settings.test2}
                    onChange={(event) => settings.set("test2", event.target.value)}
                />
            </div>

            {/* Test scroll */}
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            </p>
        </div>
    );
};
