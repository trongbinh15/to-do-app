import React, { Component } from 'react'
import { ItemModel } from '../../models/item.model';
import Item from '../Item/item';
import './list.styles.css'

type State = {
  items: ItemModel[];
}

export class List extends Component<{}, State> {
  state: State = {
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
        }
      ]
  }
  // state = {
  //   items: [
  //     {
  //       id: 1,
  //       name: 'John',
  //       status: 'Done'
  //     },
  //     {
  //       id: 2,
  //       name: 'David',
  //       status: 'New'
  //     }
  //   ]
  // }

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

  render() {
    return (
      <>
        <div className='list-item'>
          {this.state.items.map(item =>
            <Item key={item.id}
              item={item}
              onChangeStatus={this.onChangeStatus}
              onDelete={this.onDelete} />)}
        </div>
      </>
    )
  }
}

export default List;
