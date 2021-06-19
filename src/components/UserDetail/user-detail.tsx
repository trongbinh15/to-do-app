import axios from 'axios'
import React, { Component, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { localApi } from '../../config/api'
import { IUser } from '../../models/user.model'
import './user-detail.style.css'
import { v4 as uuidv4 } from 'uuid';

type State = {
  user: IUser | null;
  isNew: boolean;
}

export class UserDetail extends Component<RouteComponentProps, State> {

  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      user: null,
      isNew: true
    }
    this.nameRef = createRef();
    this.phoneRef = createRef();
    this.emailRef = createRef();
  }

  componentDidMount() {
    console.log(this.props)
    const { id } = this.props.match.params as any;
    if (id !== 'new') {
      this.setState({ isNew: false });

      axios.get(localApi.getUserById.replace('{id}', id)).then(res => {
        this.setState({ user: res.data })
      })
    } else if (id === 'new') {
      this.setState({ isNew: true });
    }
  }

  updateUserState(user: IUser) {
    this.setState({ user: user });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const model: IUser = {
      id: this.state.isNew ? uuidv4() : this.state.user?.id || '',
      email: this.emailRef.current?.value || '',
      phone: this.phoneRef.current?.value || '',
      name: this.nameRef.current?.value || ''
    }

    if (this.state.isNew) {
      axios.post<IUser>(localApi.addUser, model)
        .then(u => this.updateUserState(u.data))
    } else if (!this.state.isNew) {
      axios.put<IUser>(localApi.updateUser.replace('{id}', model.id), model)
        .then(u => this.updateUserState(u.data))
    }

    this.onBack();
  }

  onBack = () => {
    this.props.history.push('/users');
  }

  render() {
    return (
      <>
        <h1>{this.state.isNew ? 'Add New User' : 'User Detail'}</h1>
        <div className="user-detail">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">
                Name:
              </label>
              <input type="text" defaultValue={this.state.user?.name} name="name" ref={this.nameRef} />
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                Phone:
              </label>
              <input type="text" defaultValue={this.state.user?.phone} name="phone" ref={this.phoneRef} />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                Email:
              </label>
              <input type="text" name="email" defaultValue={this.state.user?.email} ref={this.emailRef} />
            </div>

            <div className="detail-actions">
              <input type="submit" value="Save" />
              <button onClick={this.onBack}>Back</button>
            </div>
          </form>
        </div>

      </>
    )
  }
}

export default UserDetail
