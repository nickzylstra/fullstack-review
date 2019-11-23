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
          <td><a href={url}>{name}</a></td>
          <td>{ownerLogin}</td>
        </tr>
      );
    })}
  </tbody>
);

export default Repos;
