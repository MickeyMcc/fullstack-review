import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => {
  console.log('props', props);
  let repos = props['repos'];
  return (<div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {repos.map((repo, index) => <RepoEntry key={index} repo={repo} />)}
    </ul>
  </div>)
  };

export default RepoList;