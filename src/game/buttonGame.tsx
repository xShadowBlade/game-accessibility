/**
 * @file Declares and handles the button game of the application.
 * The button game is a simple game where the user must click a button
 * that moves around the screen. Initially,
 */
import React, { useState, useEffect } from "react";
import { useSettings } from "../tabs/settings";

import { Button } from "@mui/material";

/**
 * The settings for the button game.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type GameSettings = {
    speed: number;
    size: number;
    autoClick: boolean;
};

export const ButtonGame: React.FC = () => {
    const settings = useSettings();

    const { speed, size, autoClick } = settings;

    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);

    // Button movement
    useEffect(() => {
        const interval = setInterval(() => {
            const x = Math.floor(Math.random() * 90);
            const y = Math.floor(Math.random() * 90);
            setButtonPosition({ x, y });

            if (autoClick) {
                setScore(score + 1); // Auto-increase score if auto-click is enabled
            }
        }, speed);
        return () => clearInterval(interval);
    }, [speed, autoClick, score]);

    const handleClick = () => {
        if (!autoClick) setScore(score + 1); // Manual click
    };

    return (
        <div className="game-container relative h-5/6 w-full border-2 border-black">
            <Button
                variant="contained"
                style={{
                    position: "absolute",
                    top: `${buttonPosition.y}%`,
                    left: `${buttonPosition.x}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                onClick={handleClick}
            >
            </Button>
            <p>Score: {score}</p>
        </div>
    );
};
