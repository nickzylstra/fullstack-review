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

  search(term) {
    const sanTerm = JSON.stringify(term);
    console.log(`${sanTerm} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: { q: sanTerm },
      success: (data) => {
        // TODO
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