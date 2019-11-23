/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher')
  .catch((err) => console.log(err));
mongoose.connection.on('error', (err) => console.log(err));
mongoose.set('debug', true);

const repoSchema = mongoose.Schema({
  repoId: Number,
  name: String,
  size: Number,
  url: String,
  ownerLogin: String,
  ownerId: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (repos, next) => {
  Promise.all(repos.map(
    ({
      id, name, owner, url, size,
    }) => {
      const curRepo = {
        repoId: id,
        name,
        size,
        url,
        ownerLogin: owner.login,
        ownerId: owner.id,
      };
      return Repo.findOneAndUpdate(curRepo, { upsert: true, new: true });
    },
  ))
    .then((updatedRepos) => {
      const updatedCount = updatedRepos.length;
      console.log(`updated or added ${updatedCount} repos to db`);
      next(null, updatedCount);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const getTop25 = (username, next) => {
  // UPDATE to generalize without username
  // Repo.find({ ownerLogin: username }).sort({ size: -1 }).limit(25)
  Repo.find().sort({ size: -1 }).limit(25)
    .then((repos) => {
      next(null, repos);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  save,
  getTop25,
};
