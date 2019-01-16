import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import Groups from './routes/Groups.jsx';
import Login from './routes/Login.jsx';
import Lists from './routes/Lists.jsx';
import List from './routes/List.jsx';
import history from './routes/history.jsx';
// import { withStyles } from '@material-ui/core/styles';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLists: [],
      displayListItems: [],
      currentItemName: '',
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleItemName = this.handleItemName.bind(this);
  }
  handleInvite() {
    history.push('/Groups')
  }
  handleItemName(event) {
    this.setState({ currentItemName: event.target.value })
  }
  handleLogin() {
    history.push('/Lists')
  }
  handleSelectList() {
    history.push('/List')
  }
  
  render() {
    return (
      <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <AppBar
            position="absolute"
            style={
              {
                backgroundColor: '#28282A',
                height: '8%',
              }
            }
            >
            <Typography variant="h5" color="inherit">
              DontForget
            </Typography>
          </AppBar>
          <div>
          <div className="page">
          <div className="wholeContainer">
          <Switch>
            <Route exact path="/"
              render={(props) =>
                <Login {...props}
                  parentState={this.state}
                  handleLogin={this.handleLogin}
                />
              }
            />
            <Route path="/Lists"
              render={(props) =>
                <Lists {...props}
                  parentState={this.state}
                  handleSelectList={this.handleSelectList}
                />
              }
            />
            <Route path="/List"
              render={(props) =>
                <List {...props}
                  parentState={this.state}
                  handleInvite={this.handleInvite}
                  handleItemName={this.handleItemName}
                /> 
              }
            />
            <Route path="/Groups"
              render={(props) => 
                <Groups {...props}
                  parentState={this.state}
                />
              }
            />
          </Switch>
          </div>
          </div>
        </div>
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
// export default withStyles(styles)(App);
