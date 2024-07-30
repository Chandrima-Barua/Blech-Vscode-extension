"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSModel = exports.getSModel = void 0;
let sModel = {};
const getSModel = () => sModel;
exports.getSModel = getSModel;
const setSModel = (model) => {
    sModel = model;
};
exports.setSModel = setSModel;
