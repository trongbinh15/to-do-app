import React, { Component } from 'react'
import { ItemModel } from '../../models/item.model';
import Item from '../Item/item';
import './list.styles.css'

type State = {
  items: ItemModel[];
  header?: string;
}

export class List extends Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      items:
        [
          {
            id: 1,
            name: 'John',
            isComplete: true
          },
          {
            id: 2,
            name: 'Nana',
            isComplete: false
          },
          {
            id: 3,
            name: 'Tuna',
            isComplete: true
          }
        ],
      header: 'To Do List',
    }
  }

  draggedItem: ItemModel | null = null;

  onDelete = (id: number) => {
    // this.items.splice(this.items.findIndex(item => item.id === id), 1);
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.filter(item => item.id !== id)
    }));
  }

  onChangeStatus = (id: number) => {
    this.setState(prev => ({
      // eslint-disable-next-line no-labels
      items: prev.items.map(item => item.id === id ? { ...item, isComplete: !item.isComplete } : item)
    }));
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


  render() {
    return (
      <>
        <div className="container">
          <div className='list-item'>
            <h1>{this.state.header}</h1>
            {this.state.items.map((item, index) =>
              <Item key={item.id}
                item={item}
                onChangeStatus={() => this.onChangeStatus(item.id)}
                onDragStart={(e) => this.onDragStart(e, index)}
                onDragOver={(e) => this.onDragOver(e, index)}
                onDragEnd={() => this.onDragEnd}
                onDelete={this.onDelete} />)}
          </div>
        </div>
      </>
    )
  }
}

export default List;
