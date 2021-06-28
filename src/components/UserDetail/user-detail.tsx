import React, { Component, createRef } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IUser } from '../../models/user.model'
import './user-detail.style.css'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store'
import { connect, ConnectedProps } from 'react-redux'
import { addUserAsync, deleteUserAsync, uniqueUserByIdSelector, updateUserAsync } from '../../store/slices/usersSlice';
import { addTaskAsync, deleteTaskAsync, ITask, updateTaskAsync, uniqueTaskByUserIdSelector } from '../../store/slices/taskSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type State = {
  isNew: boolean;
}

type ParamProp = {
  id: string;
}

export class UserDetail extends Component<PropsFromRedux, State> {

  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;

  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      isNew: true,
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
    } else if (id === 'new') {
      this.setState({ isNew: true });
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const model: IUser = {
      id: this.state.isNew ? uuidv4() : this.props.user?.id || '',
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

  deleteTask(id: string): void {
    this.props.deleteTaskAsync(id);
  }

  addTask(): void {
    const taskName = prompt('Task:', 'New task');
    const model: ITask = {
      id: uuidv4(),
      name: taskName || '',
      userId: this.props.user?.id || ''
    }
    this.props.addTaskAsync(model);
  }

  updateTask(task: ITask): void {
    const taskName = prompt('Task:', task.name);
    const model = { ...task, name: taskName || '' };
    this.props.updateTaskAsync(model);
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
              <input type="text" defaultValue={this.props.user?.name} name="name" ref={this.nameRef} />
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                Phone:
              </label>
              <input type="text" defaultValue={this.props.user?.phone} name="phone" ref={this.phoneRef} />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                Email:
              </label>
              <input type="text" name="email" defaultValue={this.props.user?.email} ref={this.emailRef} />
            </div>

            <div className="detail-actions">
              <input type="submit" value="Save" />
              <button onClick={this.onBack}>Back</button>
            </div>
          </form>
        </div>
        {this.state.isNew ? '' :
          <>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tasks.map(task =>
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td width="100px" >
                      <div className="action-group">
                        <Link to={`${this.props.match.url}/${task.id}`}>
                          <FontAwesomeIcon icon={faEdit} className="btn edit" title="Edit task" onClick={() => this.updateTask(task)} />
                        </Link>
                        <FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete task" onClick={() => this.deleteTask(task.id)} />
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
            <button className="btn add-task-btn" onClick={() => this.addTask()}>Add task</button>
          </>
        }
      </>
    )
  }
}

const makeMapState = () => {
  const taskForCurrentUserIdSelector = uniqueTaskByUserIdSelector();
  const currentUserSelector = uniqueUserByIdSelector();
  return (state: RootState, ownProps: RouteComponentProps<ParamProp>) => {
    const tasks = taskForCurrentUserIdSelector(state.tasks, ownProps.match.params.id)
    const user = currentUserSelector(state.users, ownProps.match.params.id);
    const match = ownProps.match;
    const history = ownProps.history;
    return { tasks, user, match, history };
  }
}

const mapDispatch = {
  deleteUserAsync,
  addUserAsync,
  updateUserAsync,
  addTaskAsync,
  updateTaskAsync,
  deleteTaskAsync,
}

const connector = connect(makeMapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserDetail);
