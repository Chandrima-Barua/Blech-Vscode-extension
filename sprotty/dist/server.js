"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const parseutils_1 = require("./utils/parseutils");
const sModel_1 = require("./utils/sModel");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.post('/api/data', (req, res) => {
    const sModel = (0, parseutils_1.convertToSModel)(req.body);
    // console.log("From server ts", JSON.stringify(sModel, null, 2));
    (0, sModel_1.setSModel)(sModel); // Store the sModel using the setter function
    res.json({ message: 'Data received successfully', receivedData: req.body });
});
// route to get the exported sModel
app.get('/api/smodel', (req, res) => {
    const sModel = (0, sModel_1.getSModel)(); // Retrieve the sModel using the getter function
    res.json({ sModel });
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
