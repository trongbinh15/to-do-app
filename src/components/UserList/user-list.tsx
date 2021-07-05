import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../store/store'
import './user-list.style.css'

import { deleteUserAsync, uniqueUsersSelector } from '../../store/slices/usersSlice';
import { connect, ConnectedProps } from 'react-redux'

export class UserList extends Component<PropsFromRedux, any> {
  deleteUser = (id: string) => {
    this.props.deleteUserAsync(id);
  }

  render() {
    const { users, match } = this.props;
    return (
      <>
        <h1>User List</h1>
        <div className="user-list">
          <div className="add-new">
            <Link to={`${match.url}/new`}>
              <button className="btn">Add new</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td width="100px" >
                    <div className="action-group">
                      <Link to={`${match.url}/${user.id}`}>
                        <FontAwesomeIcon icon={faEdit} className="btn edit" title="Edit user" />
                      </Link>
                      <FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete user" onClick={() => this.deleteUser(user.id)} />
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

const makeMapState = () => {
  const userSelector = uniqueUsersSelector();
  return (state: RootState, ownProps: RouteComponentProps) => {
    const users = userSelector(state.users);
    const match = ownProps.match;
    return { users, match };
  }
}

const mapDispatch = {
  deleteUserAsync
}

const connector = connect(makeMapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserList);
