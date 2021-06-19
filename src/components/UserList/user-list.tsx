import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { localApi } from '../../config/api'
import { IUser } from '../../models/user.model'
import './user-list.style.css'

type State = {
  users: IUser[];
}

export class UserList extends Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get<IUser[]>(localApi.getAllUsers).then(res => {
      this.setState({ users: res.data })
    });
  }

  deleteUser = (id: string) => {
    axios.delete(localApi.deleteUser.replace('{id}', id)).then(() => {
      this.setState(prev => ({
        users: prev.users.filter(u => u.id !== id)
      }))
    }
    )
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
              {this.state.users.map(user =>
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

export default UserList
