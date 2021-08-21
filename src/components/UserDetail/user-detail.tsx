import { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { IUser } from '../../models/user.model'
import './user-detail.style.css'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAsync, userByIdSelector, updateUserAsync } from '../../store/slices/usersSlice';
import { addTaskAsync, deleteTaskAsync, ITask, updateTaskAsync, taskByUserIdSelector } from '../../store/slices/taskSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type ParamProp = {
  id: string;
}

const UserDetail = () => {

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isNew, setIsNew] = useState(true);
  const match = useRouteMatch<ParamProp>();
  const user = useSelector((state: RootState) => userByIdSelector(state.users, match.params.id));
  const tasks = useSelector((state: RootState) => taskByUserIdSelector(state.tasks, match.params.id));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    nameRef.current?.focus();
    const { id } = match.params;
    if (id !== 'new') {
      setIsNew(false);
    } else if (id === 'new') {
      setIsNew(true);
    }
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const model: IUser = {
      id: isNew ? uuidv4() : user?.id || '',
      email: emailRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      name: nameRef.current?.value || ''
    }

    if (isNew) {
      dispatch(addUserAsync(model));
    } else if (!isNew) {
      dispatch(updateUserAsync(model));
    }

    onBack();
  }

  const onBack = () => {
    history.push('/users');
  }

  const deleteTask = (id: string): void => {
    dispatch(deleteTaskAsync(id));
  }

  const addTask = () => {
    const taskName = prompt('Task:', 'New task');
    const model: ITask = {
      id: uuidv4(),
      name: taskName || '',
      userId: user?.id || ''
    }
    dispatch(addTaskAsync(model));
  }

  const updateTask = (task: ITask) => {
    const taskName = prompt('Task:', task.name);
    const model = { ...task, name: taskName || '' };
    dispatch(updateTaskAsync(model));
  }

  return (
    <>
      <h1>{isNew ? 'Add New User' : 'User Detail'}</h1>
      <div className="user-detail">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">
              Name:
            </label>
            <input type="text" defaultValue={user?.name} name="name" ref={nameRef} />
          </div>

          <div className="input-group">
            <label htmlFor="phone">
              Phone:
            </label>
            <input type="text" defaultValue={user?.phone} name="phone" ref={phoneRef} />
          </div>

          <div className="input-group">
            <label htmlFor="email">
              Email:
            </label>
            <input type="text" name="email" defaultValue={user?.email} ref={emailRef} />
          </div>

          <div className="detail-actions">
            <input type="submit" value="Save" />
            <button onClick={onBack}>Back</button>
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
              {tasks.map(task =>
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td width="100px" >
                    <div className="action-group">
                      <Link to={`${match.url}/${task.id}`}>
                        <FontAwesomeIcon icon={faEdit} className="btn edit" title="Edit task" onClick={() => updateTask(task)} />
                      </Link>
                      <FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete task" onClick={() => deleteTask(task.id)} />
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
          <button className="btn add-task-btn" onClick={() => addTask()}>Add task</button>
        </>
      }
    </>
  )
}

export default UserDetail;
