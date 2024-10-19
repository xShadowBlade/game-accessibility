/**
 * @file The size and speed settings of the application.
 */
import React from "react";
import { Slider } from "@mui/material";

import { useSettings } from "../../tabs/settings";

/**
 * @returns The size and speed settings of the application.
 */
export const SizeAndSpeedSetting: React.FC = () => {
    const settings = useSettings();

    return (
        <>
            {settings.progress.sizeAndSpeedUnlocked === true && (
                <>
                    <h3>Size and Speed</h3>

                    <p>Change movement delay (ms): {settings.speed}</p>
                    <Slider
                        value={settings.speed}
                        onChange={(_, value) => settings.set("speed", value as number)}
                        min={1}
                        max={1000}
                        step={1}
                    />

                    <p>Change button size (px): {settings.size}</p>
                    <Slider
                        value={settings.size}
                        onChange={(_, value) => settings.set("size", value as number)}
                        min={15}
                        max={100}
                        step={1}
                    />
                </>
            )}
        </>
    );
};
