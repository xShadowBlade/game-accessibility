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
    // Rerender
    const [render, setRender] = React.useState(0);

    const rerender = () => {
        setRender(render + 1);
    };

    return (
        <SettingsProvider>
            {/* Tabs */}
            <div className="flex h-screen">
                <SettingsTab />
                <ArticleTab
                    rerender={rerender}
                />
                <GameTab />
            </div>
        </SettingsProvider>
    );
};

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(<App />);
