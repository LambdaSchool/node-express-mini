import React, { Component } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import AppHeader from '../AppHeader';
import UserTable from '../UserTable';

const styles = () => ({
  appContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    };
  }
  removeUser = (id) => {
    axios.delete(`http://localhost:5555/api/users/${id}`)
      .then(response => {
        const removedUser = response.data;
        const newUserList = this.state.users.filter(user => user.id !== removedUser.id);
        this.setState({ users: newUserList });
      });
  }
  componentDidMount(){
    axios.get('http://localhost:5555/api/users')
      .then(response => {
        this.setState({ users:response.data });
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appContainer}>
        <CssBaseline />
        <AppHeader title="Building RESTful APIs with Node.js and Express Mini" />
        <UserTable users={this.state.users} remove={this.removeUser} />
      </div>
    );
  }
}

export default withStyles(styles)(App);


// C - U - D