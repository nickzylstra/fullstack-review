import React from 'react';
// import Repo from './Repo.jsx';

const Repos = ({ repos }) => (
  <tbody>
    {repos.map((repo) => {
      const { repoId, size } = repo;
      return (
        <tr key={repoId}>
          <td>{size}</td>
        </tr>
      );
    })}
  </tbody>
);

export default Repos;
