import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../store/store'
import './user-list.style.css'

import { deleteUserAsync } from '../../store/slices/usersSlice';
import { connect, ConnectedProps } from 'react-redux'

export class UserList extends Component<PropsFromRedux, any> {
  deleteUser = (id: string) => {
    this.props.deleteUserAsync(id);
  }

  render() {
    return (
      <>
        <h1>User List</h1>
        <div className="user-list">
          <div className="add-new">
            <Link to={`${this.props.match.url}/new`}>
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
              {this.props.users.map(user =>
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td width="100px" >
                    <div className="action-group">
                      <Link to={`${this.props.match.url}/${user.id}`}>
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

const mapState = (state: RootState, ownProps: RouteComponentProps) => ({
  users: state.users.users,
  match: ownProps.match
})

const mapDispatch = {
  deleteUserAsync
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserList);
