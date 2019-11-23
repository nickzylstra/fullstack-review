/* eslint-disable react/prop-types */
import React from 'react';

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
