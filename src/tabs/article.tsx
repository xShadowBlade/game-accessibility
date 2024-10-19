/**
 * @file Declares the article tab of the application.
 */
import React, { useEffect, useState } from "react";
import { useSettings } from "./settings";
import { Tabs, Tab, Button, Box } from "@mui/material";
import { SizeAndSpeedSetting } from "../game/settings/sizeAndSpeed";
import { AutoclickSetting } from "../game/settings/autoclick";

/**
 * An article page.
 */
interface ArticlePage {
    title: string;
    content: React.ReactNode;
}

/**
 * A list of the articles.
 */
const articles: ArticlePage[] = [
    {
        title: "Introduction to Accessibility",
        content: (
            <>
                <p>
                    <strong>Accessibility</strong> is the practice of making your websites and games{" "}
                    <u>usable by as many people as possible</u>. While it often focuses on people with disabilities,
                    accessibility improvements can also benefit others, such as those using mobile devices or with slow
                    network connections.
                </p>
                <br />
                <p>
                    Accessibility in games extends beyond just visual or physical aspects. For example, a game that is
                    too difficult to play may not be accessible to many players. This is why many games include
                    difficulty settings and options that adapt to different skill levels.
                </p>
                <br />
                <p>
                    Some games are designed to be difficult, and it is okay if that is the case. This guide does not aim
                    to change that, but rather to help you consider how to make your games more accessible to a wider
                    audience.
                </p>
            </>
        ),
    },
    {
        title: "The Button Game",
        content: (
            <>
                <p>
                    Welcome to the Button Game! The goal is simple: <u>click the button</u>. However, there's a catch —
                    the button moves rapidly around the screen, making it quite difficult to click.
                </p>
                <br />
                <p>
                    This might feel frustrating and unfair, especially if you’re having trouble keeping up with the
                    speed of the button or its size on the screen. Imagine how much harder it would be for someone with
                    motor impairments or difficulty using a mouse.
                </p>
                <br />
                <p>Let's try to make the game more accessible!</p>
            </>
        ),
    },
    {
        title: "Size and Speed",
        content: (
            <>
                <p>
                    To make the game more accessible, we've added options to adjust the speed and size of the button.
                    You can now slow the button down or make it larger, making it easier to click.
                </p>
                <br />
                <p>Try adjusting the settings below:</p>
                <br />

                <SizeAndSpeedSetting />
            </>
        ),
    },
    {
        title: "Advanced Accessibility",
        content: (
            <>
                <p>
                    If adjusting the button's speed or size still makes the game difficult, we have additional
                    accessibility options to help.
                </p>
                <br />
                <p>
                    One of these options is <u>Auto-Click</u> (aka trigger bot) which automatically clicks the button
                    for you when the mouse hovers over it.
                </p>
                <br />
                <p>Try experimenting with these advanced settings to see how they affect your gameplay:</p>
                <br />
                <AutoclickSetting />
            </>
        ),
    },
];

/**
 * @returns The article tab of the application with MUI Tabs and Next/Back buttons.
 */
export const ArticleTab: React.FC<{ rerender: () => void }> = (props) => {
    const [currentArticle, setCurrentArticle] = useState(0); // State to track the active article
    const [highestArticle, setHighestArticle] = useState(0); // State to track the highest article read

    const settings = useSettings();

    // Debug
    useEffect(() => {
        (window as typeof window & { currentArticle: number }).currentArticle = currentArticle;
        (window as typeof window & { highestArticle: number }).highestArticle = highestArticle;
    }, [settings]);

    // Listen for key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                handleBack();
            } else if (event.key === "ArrowRight") {
                handleNext();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentArticle]);

    const updateProgression = (article: number) => {
        // setProgression({
        //     gameUnlocked: highestArticle >= 1,
        //     sizeAndSpeedUnlocked: highestArticle >= 1,
        // });

        settings.set("progress", {
            gameUnlocked: article >= 1,
            sizeAndSpeedUnlocked: article >= 2,
            autoclickUnlocked: article >= 3,
        });
        props.rerender();
    };

    const setArticle = (article: number) => {
        setCurrentArticle(article);
        setHighestArticle(Math.max(article, highestArticle));
        updateProgression(Math.max(article, highestArticle));
    };

    // Handlers for next and previous articles
    const handleNext = () => {
        if (currentArticle < articles.length - 1) {
            setArticle(currentArticle + 1);
        }
    };

    const handleBack = () => {
        if (currentArticle > 0) {
            setArticle(currentArticle - 1);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setArticle(newValue); // Change the current article based on the selected tab
    };

    return (
        <div className="w-2/5 tab overflow-y-auto">
            <h1 className="text-3xl font-bold text-center">Articles</h1>
            <hr />

            {/* Material UI Tabs */}
            <Tabs
                value={currentArticle}
                onChange={handleTabChange}
                aria-label="Article Tabs"
                variant="scrollable"
                scrollButtons="auto"
            >
                {articles.map((article, index) => (
                    <Tab key={article.title} label={article.title} />
                ))}
            </Tabs>

            <hr />

            {/* Article content */}
            <div className="p-4">
                <h2 className="text-2xl font-bold">{articles[currentArticle].title}</h2>
                <Box mt={2}>{articles[currentArticle].content}</Box>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <Button variant="contained" color="primary" onClick={handleBack} disabled={currentArticle === 0}>
                    Back (←)
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={currentArticle === articles.length - 1}
                >
                    Next (→)
                </Button>
            </div>
        </div>
    );
};
