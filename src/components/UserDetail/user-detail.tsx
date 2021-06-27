import React, { Component, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IUser } from '../../models/user.model'
import './user-detail.style.css'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store'
import { connect, ConnectedProps } from 'react-redux'
import { addUserAsync, deleteUserAsync, updateUserAsync } from '../../store/slices/usersSlice';

type State = {
  user: IUser | null;
  isNew: boolean;
}

export class UserDetail extends Component<PropsFromRedux, State> {

  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;

  constructor(props: PropsFromRedux) {
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
    this.nameRef.current?.focus();
    const { id } = this.props.match.params as any;
    if (id !== 'new') {
      this.setState({ isNew: false });
      const user = this.props.users.find(x => x.id === id);
      if (user) {
        this.setState({ user: user });
      }

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
      this.props.addUserAsync(model);
    } else if (!this.state.isNew) {
      this.props.updateUserAsync(model);
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

const mapState = (state: RootState, ownProps: RouteComponentProps) => ({
  users: state.users.users,
  match: ownProps.match,
  history: ownProps.history
})

const mapDispatch = {
  deleteUserAsync,
  addUserAsync,
  updateUserAsync
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserDetail);
