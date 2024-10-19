/**
 * @file Declares and handles the button game of the application.
 * The button game is a simple game where the user must click a button
 * that moves around the screen. Initially,
 */
import React, { useState, useEffect } from "react";
import { useSettings } from "../tabs/settings";

import { Button, Box } from "@mui/material";

/**
 * The settings for the button game.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type GameSettings = {
    speed: number;
    size: number;
    autoClick: boolean;
};

/**
 * @returns The button game component.
 */
export const ButtonGame: React.FC = () => {
    const settings = useSettings();

    const { speed, size, autoClick } = settings;

    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);

    /**
     * Move the button to a random position on the screen.
     */
    const moveButton = () => {
        const x = Math.floor(Math.random() * 90);
        const y = Math.floor(Math.random() * 90);
        setButtonPosition({ x, y });
    };

    /**
     * Increase the score by one and move the button
     */
    const clickButton = () => {
        setScore(score + 1);
        moveButton();
    };

    const handleAutoClick = () => {
        // settings.set("autoClick", !autoClick);

        // If the mouse is hovering over the button, click it
        if (autoClick) {
            clickButton();
        }
    };

    // Button movement
    useEffect(() => {
        const interval = setInterval(() => {
            moveButton();
        }, speed);
        return () => clearInterval(interval);
    }, [speed, autoClick, score]);

    const handleClick = () => {
        clickButton();
    };

    return (
        <div
            className="game-container relative h-5/6 w-full border-2 border-black"
            style={{ backgroundColor: settings.bgColor }}
        >
            <button
                // variant="contained"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{
                    position: "absolute",
                    top: `${buttonPosition.y}%`,
                    left: `${buttonPosition.x}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                onClick={handleClick}
                onMouseOver={handleAutoClick}
            ></button>
            <p>Score: {score}</p>
        </div>
    );
};
