import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { IItem, ItemModel } from '../../models/item.model';
import ItemComponent from '../Item/item';
import './list.styles.css'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { localApi } from '../../config/api';

type State = {
  items: ItemModel[];
  isAdding: boolean;
}

export class ListComponent extends Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      items: [],
      isAdding: false
    }
  }

  draggedItem: ItemModel | null = null;

  handleKeyPress = (ev: KeyboardEvent) => {
    if (ev.code === 'Space') {
      this.onAddNewItem();
    }
  }

  onDelete = (id: string) => {
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.filter(item => item.id !== id)
    }));
    axios.delete(localApi.deleteItem.replace('{id}', id))
    this.setState({ isAdding: false });
  }

  onChangeStatus = (id: string) => {
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.map(item => item.id === id ? { ...item, isComplete: !item.isComplete } : item)
    }));

    const currentItem = this.state.items.find(x => x.id === id);
    if (currentItem) {
      axios.put(localApi.updateItem.replace('{id}', id), { ...currentItem, isComplete: !currentItem.isComplete })
      this.setState({ isAdding: false });
    }
  }

  onToggleEdit = (id: string) => {
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.map(item => item.id === id ? { ...item, isEdit: !item.isEdit } : item)
    }));
  }

  onChangeName = (id: string, value: string) => {
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.map(item => item.id === id ? { ...item, name: value } : item)
    }));

    const currentItem = this.state.items.find(x => x.id === id);
    if (currentItem) {
      axios.put(localApi.updateItem.replace('{id}', id), { ...currentItem, name: value })
      this.setState({ isAdding: false });
    }

  }

  onDragStart = (e: any, index?: number) => {
    if (index !== undefined) {
      this.draggedItem = this.state.items[index];
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20); // firefox
    }
  };

  onDragOver = (e: any, index: number) => {
    e.preventDefault();
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    if (this.draggedItem) {
      items.splice(index, 0, this.draggedItem);
    }

    this.setState({ items });
  };

  onDragEnd = () => {
    this.draggedItem = null;
  };


  onAddNewItem = () => {
    if (this.state.isAdding) return;
    const newId = uuidv4();
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: [...prev.items, {
        id: newId,
        isComplete: false,
        isEdit: true,
        name: ''
      }],
    }));

    const newItem = {
      id: newId,
      isComplete: false,
      name: ''
    };

    axios.post(localApi.addItem, newItem)
    this.setState({ isAdding: true });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)

    axios.get<IItem[]>(localApi.getAllItems).then(
      items => {
        this.setState({
          items: items.data.map(x => new ItemModel(x))
        })
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  render() {
    return (
      <>
        <div className='list-item'>
          {this.state.items.length === 0 ? <div>Nothing to do</div> :
            this.state.items.map((item, index) =>
              <ItemComponent key={item.id}
                item={item}
                onChangeStatus={() => this.onChangeStatus(item.id)}
                onToggleEdit={() => this.onToggleEdit(item.id)}
                onChangeName={(value) => this.onChangeName(item.id, value)}
                onDragStart={(e) => this.onDragStart(e, index)}
                onDragOver={(e) => this.onDragOver(e, index)}
                onDragEnd={() => this.onDragEnd}
                onDelete={this.onDelete} />)}
          <div className="add-section">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size='lg'
              className={`btn add-btn + ${this.state.isAdding ? 'is-adding' : ''}`}
              title="Press Space to Add"
              onClick={this.onAddNewItem} />
          </div>
        </div>
      </>
    )
  }
}

export default ListComponent;
