const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = mongoose.Schema({
  repoId: Number,
  views: Number,
  url: String,
  ownerLogin: String,
  ownerId: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

module.exports.save = save;
