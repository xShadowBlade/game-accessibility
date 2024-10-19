/**
 * @file This file is the entry point for your project.
 */

import React from "react";
import { createRoot } from "react-dom/client";

/**
 * @returns The root component of the application.
 */
const App: React.FC = () => {
    return (
        <div className="p-4 m-1">
            <h1 className="text-3xl font-bold underline">Hello World!</h1>
        </div>
    );
};

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(<App />);
