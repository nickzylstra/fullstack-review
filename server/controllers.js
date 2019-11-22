const db = require('../database/index');
const { getReposByUserName } = require('../helpers/github');

module.exports = {
  addUser: (userName) => {
    getReposByUserName(userName, (err, data) => {
      debugger;
      db.save(data);
    });
  },
};
