/* eslint-disable no-console */
const mongoose = require('mongoose');

// const DBURL = 'mongodb://localhost/fetcher';
const pw = process.env.DBPW;
const DBURL = `mongodb://heroku_1n88hpr3:${pw}@ds121105.mlab.com:21105/heroku_1n88hpr3`;

mongoose.connect(DBURL, { useNewUrlParser: true })
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
      // eslint-disable-next-line camelcase
      id, name, owner, svn_url, size,
    }) => {
      const curRepo = {
        repoId: id,
        name,
        size,
        url: svn_url,
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
