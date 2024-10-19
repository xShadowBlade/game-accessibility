/**
 * @file Declares the game tab of the application.
 */
import React from "react";
import { useSettings } from "./settings";

import { ButtonGame } from "../game/buttonGame";

/**
 * @returns The game tab of the application.
 */
export const GameTab: React.FC = () => {
    const settings = useSettings();

    return (
        <div className="w-2/5 tab">
            <h1 className="text-3xl font-bold text-center">Game</h1>
            <hr />
            {settings.progress.gameUnlocked === true && <ButtonGame />}
            {/* <ButtonGame /> */}
        </div>
    );
};
