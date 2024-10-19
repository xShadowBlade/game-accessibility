/**
 * @file This file is the entry point for your project.
 */

import React from "react";
import { createRoot } from "react-dom/client";

import { SettingsProvider, SettingsTab } from "./tabs/settings";
import { ArticleTab } from "./tabs/article";
import { GameTab } from "./tabs/game";

/**
 * @returns The root component of the application.
 */
const App: React.FC = () => {
    return (
        <SettingsProvider>
            {/* Tabs */}
            <div className="flex h-screen">
                <SettingsTab />
                <ArticleTab />
                <GameTab />
            </div>
        </SettingsProvider>
    );
};

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(<App />);
