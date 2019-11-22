const db = require('../database/index');
const { getReposByUsername } = require('../helpers/github');

module.exports = {
  addUser: (username, next) => {
    getReposByUsername(username, (err, data) => {
      debugger;
      db.save(data);
    });
  },
};
