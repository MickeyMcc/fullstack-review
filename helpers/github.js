const request = require('request');
config = require('../config.js');

let getReposByUsername = (username, callback) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN || config.TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, body);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;