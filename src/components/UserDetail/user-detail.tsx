import React, { Component, createRef } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IUser } from '../../models/user.model'
import './user-detail.style.css'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store'
import { connect, ConnectedProps } from 'react-redux'
import { ACTIONS } from '../../actions'
import { ITask } from '../../models/task.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type State = {
  isNew: boolean;
}

type ParamRoute = {
  id: string;
}

export class UserDetail extends Component<PropsFromRedux, State> {

  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;

  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      isNew: true
    }
    this.nameRef = createRef();
    this.phoneRef = createRef();
    this.emailRef = createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params as any;
    if (id !== 'new') {
      this.setState({ isNew: false });
    } else if (id === 'new') {
      this.setState({ isNew: true });
    }
  }

  updateUserState(user: IUser) {
    this.props.updateUser(user);
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
      this.props.addUser(model);
    } else if (!this.state.isNew) {
      this.props.updateUser(model);
    }

    this.onBack();
  }

  onBack = () => {
    this.props.history.push('/users');
  }

  addTask(): void {
    const taskName = prompt('Task:', 'New task');
    const model: ITask = {
      id: uuidv4(),
      name: taskName || '',
      userId: this.props.user?.id || ''
    }
    this.props.addTask(model);
  }

  deleteTask(id: string): void {
    this.props.deleteTask(id);
  }

  updateTask(task: ITask): void {
    const taskName = prompt('Task:', task.name);
    const model = { ...task, name: taskName || '' };
    this.props.updateTask(model);
  }

  render() {
    const { user, tasks, match } = this.props;
    const { isNew } = this.state;
    return (
      <>
        <h1>{this.state.isNew ? 'Add New User' : 'User Detail'}</h1>
        <div className="user-detail">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">
                Name:
              </label>
              <input type="text" defaultValue={user?.name} name="name" ref={this.nameRef} />
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                Phone:
              </label>
              <input type="text" defaultValue={user?.phone} name="phone" ref={this.phoneRef} />
            </div>

            <div className="input-group">
              <label htmlFor="email">
                Email:
              </label>
              <input type="text" name="email" defaultValue={user?.email} ref={this.emailRef} />
            </div>

            <div className="detail-actions">
              <input type="submit" value="Save" />
              <button onClick={this.onBack}>Back</button>
            </div>
          </form>
        </div>
        {isNew ? '' :
          <>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: ITask) =>
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td width="100px" >
                      <div className="action-group">
                        <Link to={`${match.url}/${task.id}`}>
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

const mapState = (state: RootState, ownProps: RouteComponentProps<ParamRoute>) => {
  const user = state.users.find((x: IUser) => x.id === ownProps.match.params.id);
  const tasks = state.tasks.filter((x: ITask) => x.userId === ownProps.match.params.id);
  const match = ownProps.match;
  const history = ownProps.history;
  return { user, match, history, tasks };
};

const mapDispatch = {
  updateUser: (user: IUser) => ({ type: ACTIONS.USER_UPDATE, payload: user }),
  addUser: (user: IUser) => ({ type: ACTIONS.USER_ADD, payload: user }),

  addTask: (task: ITask) => ({ type: ACTIONS.TASK_ADD, payload: task }),
  updateTask: (task: ITask) => ({ type: ACTIONS.TASK_UPDATE, payload: task }),
  deleteTask: (id: string) => ({ type: ACTIONS.TASK_DELETE, payload: id }),
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserDetail);
