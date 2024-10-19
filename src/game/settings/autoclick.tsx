/**
 * @file The autoclick settings of the application.
 */
import React from "react";
import { Slider, Switch } from "@mui/material";

import { useSettings } from "../../tabs/settings";

/**
 * @returns The autoclick settings of the application.
 */
export const AutoclickSetting: React.FC = () => {
    const settings = useSettings();

    return (
        <>
            {settings.progress.autoclickUnlocked === true && (
                <>
                    <h3>Autoclick</h3>

                    <p>Enable autoclick: {settings.autoClick ? "Yes" : "No"}</p>
                    <Switch checked={settings.autoClick} onChange={(_, value) => settings.set("autoClick", value)} />
                </>
            )}
        </>
    );
};
