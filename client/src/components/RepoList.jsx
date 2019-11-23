import React from 'react';
import Repos from './Repos.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <table>
      <Repos repos={repos} />
    </table>
  </div>
)

export default RepoList;
