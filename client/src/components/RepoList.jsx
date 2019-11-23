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
      <thead>
        <tr>
          <td>Size</td>
          <td>Name</td>
          <td>Owner</td>
        </tr>
      </thead>
      <Repos repos={repos} />
    </table>
  </div>
);

export default RepoList;
