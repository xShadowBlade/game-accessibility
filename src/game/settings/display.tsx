/**
 * @file Declares the color picker for the background and button
 */
import React from "react";
import { HexColorPicker } from "react-colorful";

import { useSettings } from "../../tabs/settings";

/**
 * @returns The color picker for the background and button
 */
export const ColorPicker: React.FC = () => {
    const settings = useSettings();

    return (
        <>
            {settings.progress.colorPickerUnlocked === true && (
                <>
                    <h3>Color Picker</h3>

                    <p>Change the background color:</p>
                    <HexColorPicker color={settings.bgColor} onChange={(color) => settings.set("bgColor", color)} />
                </>
            )}
        </>
    );
};
