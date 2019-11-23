/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/extensions
import Repos from './Repos.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    <div>
      Here are the top
      {' '}
      {repos.length}
      {' '}
      repos by size:
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
