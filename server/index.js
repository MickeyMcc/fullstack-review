const express = require('express');
const bodyParser = require('body-parser')
const helpers = require('../helpers/github');
const dbMethods = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  let username = req.body.query;
  helpers.getReposByUsername(username, function(err, body) {
    if (err) {
      console.log(err);
      res.status(500).end(err);
    } else {
      repos = JSON.parse(body);
      dbMethods.save(username, repos);
      res.status(201).end(JSON.stringify({ message: `${repos.length} found on github for ${req.body.query}`}));
    }
  });
});

app.get('/repos', function (req, res) {
  dbMethods.query(function(err, repos) {
    if (err) {
      console.log(err);
    } else {
      console.log(repos);
      res.status(200).end(JSON.stringify(repos));
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

