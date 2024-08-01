"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sprotty_1 = require("sprotty");
const di_config_1 = require("./di.config");
const model_source_1 = require("./model-source");
async function run() {
    const graph = await (0, model_source_1.fetchSModelData)();
    const container = (0, di_config_1.createContainer)("sprotty-container");
    const modelSource = container.get(sprotty_1.TYPES.ModelSource);
    modelSource.setModel(graph);
}
exports.default = run;
document.addEventListener("DOMContentLoaded", () => run());
