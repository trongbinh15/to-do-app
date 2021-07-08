import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ACTIONS } from '../../actions'
import { IUser } from '../../models/user.model'
import { RootState } from '../../store/store'
import './user-list.style.css'

export class UserList extends Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchUsers();
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
                      <FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete user" onClick={() => this.props.deleteUser(user.id)} />
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


const mapState = (state: RootState, ownProps: RouteComponentProps) => {
  const users = state.users as IUser[];
  const match = ownProps.match;
  return { users, match };
};

const mapDispatch = {
  fetchUsers: () => ({ type: ACTIONS.USERS_FETCH }),
  deleteUser: (id: string) => ({ type: ACTIONS.USER_DELETE, payload: id })
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserList);
