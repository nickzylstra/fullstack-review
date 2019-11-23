/* eslint-disable no-console */
const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.urlencoded({ extended: true }));

app.post('/repos', (req, res) => {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const query = req.body.q;
  console.log(`'${query}' was submitted to /repos POST`);
  controllers.addUser(query, (err, updatedCount) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).end(JSON.stringify(updatedCount));
    }
  });
});

app.get('/repos', (req, res) => {
  // This route should send back the top 25 repos
  const username = req.body.q || 'nickzylstra';
  controllers.getTop25(username, (err, repos) => {
    console.log(`serving top 25 repos for ${username}`);
    res.end(JSON.stringify(repos));
  });
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 1128;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
