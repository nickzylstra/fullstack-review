/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => console.log(err));
mongoose.connection.on('error', (err) => console.log(err));
// mongoose.set('debug', true);

const repoSchema = mongoose.Schema({
  repoId: Number,
  name: String,
  size: Number,
  url: String,
  ownerLogin: String,
  ownerId: Number,
});

const Repo = mongoose.model('Repo', repoSchema);
// const test = new Repo({
//   repoId: 12414,
//   name: 'test',
//   size: 11,
//   url: 'http://www.test.com',
//   ownerLogin: 'test',
//   ownerId: 1423,
// });

// test.save().then(() => {
//   console.log('inserted test');
// })
//   .catch((err) => {
//     console.log(err);
//   });

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
      return Repo.findOneAndUpdate({ repoId: id }, curRepo, { upsert: true, new: true }).exec();
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
