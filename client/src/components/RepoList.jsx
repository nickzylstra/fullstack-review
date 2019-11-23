/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/extensions
import Repos from './Repos.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    <div>
      There are
      {' '}
      {repos.length}
      {' '}
      repos.
    </div>
    <table>
      <Repos repos={repos} />
    </table>
  </div>
);

export default RepoList;
