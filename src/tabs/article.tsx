/**
 * @file Declares the article tab of the application.
 */
import React from "react";
import { useSettings } from "./settings";

interface ArticlePage {
    title: string;
    content: React.ReactNode;
}

const articles: ArticlePage[] = [
    {
        title: "Introduction to Accessibility",
        content: (
            <>
                <b>What is accessibility?</b>
                <br />
                <b>Accessibility</b> is the practice of making your websites{" "}
                <u>usable by as many people as possible.</u> We traditionally think of this as being about people with
                disabilities, but the practice of making sites accessible also benefits other groups such as those using
                mobile devices, or those with slow network connections.
                <br />
                Accessibility also applies to games and their difficulty. For example, a game that is too difficult to
                play is not accessible to many people. This is why many games have difficulty settings.
                <br />
                This website explores ways to make your games more accessible.
            </>
        ),
    },
];

/**
 * @returns The article tab of the application.
 */
export const ArticleTab: React.FC = () => {
    const settings = useSettings();

    return (
        <div className="w-2/5 tab overflow-y-auto">
            <h1 className="text-3xl font-bold underline">Articles</h1>
            {articles.map((article) => (
                <div key={article.title} className="p-4">
                    <h2 className="text-2xl font-bold">{article.title}</h2>
                    {article.content}
                </div>
            ))}
        </div>
    );
};
