const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({  //prop lookups on API query 
  name: String,       // ['name']
  owner_name: String, // ['owner']['login']
  stargazers: Integer,// ['stargazers_count']
  url: String,        // ['html_url']
  avatar_url: String  // ['avatar_url']
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;