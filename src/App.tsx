import './App.css';
import { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserList from './components/UserList/user-list';
import UserDetail from './components/UserDetail/user-detail';
import { fetchUsersAsync } from './store/slices/usersSlice';
import { fetchTasksAsync } from './store/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './components/Spinner/spinner';
import { loadingSelector } from './store/slices/baseSlice';
const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(fetchUsersAsync());
    dispatch(fetchTasksAsync());
  }, [])

  return (
    <>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/users">Home</Link>
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
        {loading ? <Spinner /> : ''}
      </div>
    </>
  );
}

export default App;
