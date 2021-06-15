import { faBars, faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, createRef, DragEventHandler } from 'react'
import { ItemModel } from '../../models/item.model';
import './item.styles.css'

type Prop = {
  item: ItemModel;
  onDelete: (id: string) => void;
  onChangeStatus: () => void;
  onToggleEdit: () => void;
  onChangeName: (value: string) => void;
  onDragStart: (e: DragEventHandler<HTMLDivElement>) => void;
  onDragOver: (e: DragEventHandler<HTMLDivElement>) => void;
  onDragEnd: (e: DragEventHandler<HTMLDivElement>) => void;
};

export class ItemComponent extends Component<Prop> {
  private ref: React.RefObject<HTMLInputElement>;
  constructor(props: Prop) {
    super(props);
    this.ref = createRef();
  }

  toggleEdit = () => this.props.onToggleEdit();

  updateName = () => {
    this.props.onChangeName(this.ref.current?.value as string);
    this.toggleEdit();
  }

  handleDeleteEvent = () => this.props.onDelete(this.props.item.id);
  handleChangeStatueEvent = () => this.props.onChangeStatus();
  handleOnDragStart = (e: any) => this.props.onDragStart(e);
  handleOnDragEnd = (e: any) => this.props.onDragOver(e);

  shouldComponentUpdate(nextProp: Prop) {
    return (this.props.item.isComplete !== nextProp.item.isComplete) 
    || (this.props.item.isEdit !== nextProp.item.isEdit)
    || (this.props.item.name !== nextProp.item.name)
  }


  handleEnterPress = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      this.updateName();
    }
  }

  componentDidUpdate(){
    this.ref.current?.focus();
    this.ref.current?.addEventListener('keydown', this.handleEnterPress);
  }

  componentDidMount(){
    this.ref.current?.focus();
  }

  componentWillUnmount(){
    this.ref.current?.removeEventListener('keydown', this.handleEnterPress);
  }

  render() {
    return (
      <div className="item-container">
        <div className="movable" 
          onDragStart={this.handleOnDragStart}
          onDragOver={this.handleOnDragEnd}
          onDragEnd={this.handleOnDragEnd} draggable>
          <FontAwesomeIcon icon={faBars} className="btn"/>
          </div>
        <input type="checkbox"
          className="check-box"
          defaultChecked={this.props.item.isComplete}
          onChange={this.handleChangeStatueEvent} />

        {this.props.item.isEdit ?
          <input type="text" className="item-name" defaultValue={this.props.item.name} ref={this.ref} /> :
          <div className={`item-name ${this.props.item.isComplete ? 'is-complete' : ''} `}>{this.props.item.name}</div>
        }
        <div className="actions">
        {this.props.item.isEdit ? 
          <FontAwesomeIcon icon={faCheck} className="btn done" onClick={this.updateName}/>
            : <FontAwesomeIcon icon={faEdit} className="btn edit" onClick={this.toggleEdit} />
          }
          <FontAwesomeIcon icon={faTrash} className="btn delete" onClick={this.handleDeleteEvent}/>
        </div>
      </div>
    )
  }
}

export default ItemComponent
