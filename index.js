const serverless = require('serverless-http');
const express = require('express');
const { getSchedule } = require('./db.js');
const cors = require('cors');
const moment = require('moment');
const app = express();

app.use(cors());
app.get('/', (req, res) => {
  getSchedule(function(err, data) {
    if (err) {
      return res(err);
    } else {
      return res.json(data);
    }
  });
});

// const port = 3000;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports.handler = serverless(app);
