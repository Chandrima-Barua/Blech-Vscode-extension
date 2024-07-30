// import "reflect-metadata";
// import { LocalModelSource, TYPES } from 'sprotty';
// import { createContainer } from './di.config';
// import { fetchSModelData } from "./model-source";

export default async function run() {
    const graph = await fetchSModelData();
    console.log(graph)
    const container = createContainer("sprotty-container");
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(graph);
}

// document.addEventListener("DOMContentLoaded", () => run());

import "reflect-metadata";
import { LocalModelSource, TYPES } from 'sprotty';
import { createContainer } from './di.config';
import { fetchSModelData } from "./model-source";

export async function getSprottyHtml(): Promise<string> {
    const graph = await fetchSModelData();
    const container = createContainer("sprotty-container");
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(graph);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sprotty Graph</title>
        <style>
            html, body, #sprotty {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
        </style>
        <script src="https://unpkg.com/sprotty"></script>
    </head>
    <body>
        <div id="sprotty-container"></div>
        <script>
            ${modelSource}
        </script>
    </body>
    </html>`;
}

document.addEventListener("DOMContentLoaded", () => {
    run();
});
