import "reflect-metadata";
import { LocalModelSource, TYPES } from 'sprotty';
import { createContainer } from './di.config';
import { fetchSModelData } from "./model-source";

export default async function run() {
    const graph = await fetchSModelData();
    console.log(graph)
    const container = createContainer("sprotty-container");
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(graph);
}

document.addEventListener("DOMContentLoaded", () => run());

