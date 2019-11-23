/* eslint-disable react/prop-types */
import React from 'react';

const Repos = ({ repos }) => (
  <tbody>
    {repos.map((repo) => {
      const {
        repoId, name, size, url, ownerLogin,
      } = repo;
      return (
        <tr key={repoId}>
          <td>{size}</td>
          <td>{name}</td>
          <td>{ownerLogin}</td>
          <td>{url}</td>
        </tr>
      );
    })}
  </tbody>
);

export default Repos;
