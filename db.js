const mongodb = require('mongodb');
const moment = require('moment');

require('dotenv').config();

module.exports.getSchedule = (callback) => {
  const uri = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@ds141043.mlab.com:41043/four-factors`;

  mongodb.MongoClient.connect(
    uri,
    (err, client) => {
      if (err) throw err;

      const db = client.db('four-factors');

      const collection = db.collection('scheduleWithFourFactors');
      collection
        .find({
          date: moment()
            .subtract(6, 'hours')
            .format('YYYYMMDD'),
        })
        .toArray(callback);

      // Only close the connection when your app is terminating.
      client.close((error) => {
        if (error) throw err;
      });
    },
  );
};
