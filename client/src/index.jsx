import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount () {
    console.log('mounted');
    this.getTopRepos();
  }

  getTopRepos () {
    let context = this;
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json',
      success: function (data) {
        context.setState({ repos: JSON.parse(data) });
        console.log()
      },
      error: function (err) {
        console.log(err, 'error');
      }
    })
  }

  search (term) {
    var context = this;
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data:  JSON.stringify({
        query: term
      }),
      success: function(data) {
        const response = JSON.parse(data);
        console.log('successful search', response.message);
        context.getTopRepos();
      }, 
      error: function(err) {
        console.log(err, 'error');
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));