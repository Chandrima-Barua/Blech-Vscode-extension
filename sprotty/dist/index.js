"use strict";
// import "reflect-metadata";
// import { LocalModelSource, TYPES } from 'sprotty';
// import { createContainer } from './di.config';
// import { fetchSModelData } from "./model-source";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSprottyHtml = void 0;
async function run() {
    const graph = await (0, model_source_1.fetchSModelData)();
    console.log(graph);
    const container = (0, di_config_1.createContainer)("sprotty-container");
    const modelSource = container.get(sprotty_1.TYPES.ModelSource);
    modelSource.setModel(graph);
}
exports.default = run;
// document.addEventListener("DOMContentLoaded", () => run());
require("reflect-metadata");
const sprotty_1 = require("sprotty");
const di_config_1 = require("./di.config");
const model_source_1 = require("./model-source");
async function getSprottyHtml() {
    const graph = await (0, model_source_1.fetchSModelData)();
    const container = (0, di_config_1.createContainer)("sprotty-container");
    const modelSource = container.get(sprotty_1.TYPES.ModelSource);
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
exports.getSprottyHtml = getSprottyHtml;
document.addEventListener("DOMContentLoaded", () => {
    run();
});
