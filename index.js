const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { getSchedule } = require('./db.js');

const app = express();

app.use(cors());
app.get('/', (req, res) => {
  getSchedule((err, data) => {
    if (err) {
      return res(err);
    }
    return res.json(data);
  });
});

// const port = 3000;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports.handler = serverless(app);
