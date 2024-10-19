/**
 * @file Handles progression in the game article
 */
/**
 * The progression points in the game article.
 */
export const progressionPoints = [
    "gameUnlocked",
    "sizeAndSpeedUnlocked",
    "autoclickUnlocked",
] as const satisfies string[];

export type ProgressionPoints = {
    [K in (typeof progressionPoints)[number]]: boolean;
};
