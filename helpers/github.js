const request = require('request');
//const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  var url = `https://api.github.com/users/${username}/repos`;
  console.log('you made it!');
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request'
      //'Authorization': `token ${config.TOKEN}`
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