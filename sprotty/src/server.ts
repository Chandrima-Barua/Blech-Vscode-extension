import express from 'express';
import bodyParser from 'body-parser';
import { convertToSModel } from './utils/parseutils';
import { getSModel, setSModel } from './utils/sModel';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from Sprotty!' });
// });


// app.post('/api/data', (req, res) => {
//   // console.log('Received data:', req.body);
//   // const nodeData = req.body.Node;
//   // const edgeData = req.body.Edge;

//   const sModel = convertToSModel(req.body);
//   console.log("From server ts", JSON.stringify(sModel, null, 2));
//   res.json({ message: 'Data received successfully', receivedData: req.body });
// });

app.post('/api/data', (req, res) => {
  const sModel = convertToSModel(req.body);
  // console.log("From server ts", JSON.stringify(sModel, null, 2));
  setSModel(sModel); // Store the sModel using the setter function
  res.json({ message: 'Data received successfully', receivedData: req.body });
});

// New route to get the exported sModel
app.get('/api/smodel', (req, res) => {
  const sModel = getSModel(); // Retrieve the sModel using the getter function
  res.json({ sModel });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});