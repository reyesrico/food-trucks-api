
import express from 'express';
import axios from 'axios';
import render from './src/helpers/render.js';
import data from './src/trucks-data.js';

const app = express();
const PORT = 8000;

let info = [];

data.forEach(truck => {
  axios.get(truck.url).then(async (response) => {
    try {
      let dataRendered = await render(truck.id, response.data);
      info = [...info, ...dataRendered];
    } catch (_) { }
  });
});

app.get('/', (_, res) => {
  res.json(info);
});

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
