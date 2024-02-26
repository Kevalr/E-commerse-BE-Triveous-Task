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

const port = process.env.PORT || 8000;

// Server Test Route
app.get('/ready',(req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!, we will fix soon, please try after sometime');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});