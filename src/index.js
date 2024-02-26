const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const router = require('./routes');

//For env File 
dotenv.config();

const app = express();

//Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT || 8000;

app.get('/',(req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});