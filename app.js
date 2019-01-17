const express = require('express');
const realtor = require('realtorca');

var port = process.env.PORT || 8080;
var app = express();

app.use(express.static('views'));

app.get('/', (req, res) => {
  const opts = {
  LongitudeMin: -76.1361741,
  LongitudeMax: -75.3778885,
  LatitudeMin: 44.3367556,
  LatitudeMax: 44.6683008,
  PropertyTypeGroupID: 2,
  PropertySearchTypeId: 0,
  TransactionTypeId: 2,
  RecordsPerPage: 200
  }

  console.log( realtor.buildUrl(opts) );

  realtor.post(opts)
  .then(data => {
    // res.send(data.Results[0]);
    var results = data.Results;
    res.render('results.ejs', {results: results});
  })
  .catch(err => {

  });
});

app.listen(port, () => {
  console.log(`The server has started on port ${port}!`);
})
