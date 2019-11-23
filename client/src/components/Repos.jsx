/* eslint-disable react/prop-types */
import React from 'react';

const Repos = ({ repos }) => (
  <tbody>
    {repos.map((repo) => {
      const {
        repoId, size, url, ownerLogin,
      } = repo;
      return (
        <tr key={repoId}>
          <td>{size}</td>
          <td>{ownerLogin}</td>
          <td>{url}</td>
        </tr>
      );
    })}
  </tbody>
);

export default Repos;
