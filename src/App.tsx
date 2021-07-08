import './App.css';
import { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserList from './components/UserList/user-list';
import UserDetail from './components/UserDetail/user-detail';
import Spinner from './components/Spinner/spinner';
import { RootState } from './store/store';
import { connect, ConnectedProps } from 'react-redux';
class App extends Component<PropsFromRedux> {
  render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/users" component={UserList} />
          <Route path="/users/:id" component={UserDetail}>
          </Route>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route path="*">
            <h1>Page not found!</h1>
          </Route>
        </Switch>
        {this.props.isLoading ? <Spinner /> : ''}
      </div>
    );
  };
}

const mapState = (state: RootState) => {
  const isLoading = state.base.isLoading;
  return { isLoading };
};

const mapDispatch = {

}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(App);
