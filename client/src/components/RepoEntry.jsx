import React from 'react';

const RepoEntry = (props) => {
  const stargazers = props.repo.stargazers;
  const reponame = props.repo.name;
  const ownername = props.repo.owner_name;
  const url = props.repo.url;
  return (
  <li> 
    <a href = {url}> {reponame} </a>
      {ownername} : {stargazers} stargazers 
    </li>
  )
}

export default RepoEntry;