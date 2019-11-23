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

  componentDidMount() {
    this.getTop25();
  }

  getTop25(username) {
    $.ajax({
      url:'/repos',
      data: { q: username },
      success: (body) => {
        const repos = JSON.parse(body);
        console.log(`${repos.length} repos retrieved for ${username}`);
        this.setState({
          repos,
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: { q: term },
      success: (updatedCount) => {
        console.log(`${updatedCount} repos added or updated`)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));