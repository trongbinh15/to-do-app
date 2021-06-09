import React, { Component } from 'react'
import { ItemModel } from '../../models/item.model';
import './item.styles.css'
type Prop = {
  item: ItemModel;
  onDelete: (id: number) => void;
  onChangeStatus: (id: number) => void;
};


export class Item extends Component<Prop> {
  handleDeleteEvent = () => this.props.onDelete(this.props.item.id);
  handleChangeStatueEvent = () => this.props.onChangeStatus(this.props.item.id);

  shouldComponentUpdate(nextProp: any) {
    return this.props.item.isComplete !== nextProp.item.isComplete
  }

  render() {
    console.log('render:')
    return (
      <div>
        <h1>{this.props.item.name} {this.props.item.isComplete ? 'True' : 'False'}</h1>
        <button onClick={this.handleDeleteEvent}>Delete</button>
        <button onClick={this.handleChangeStatueEvent}>Change Status</button>
      </div>
    )
  }
}

export default Item
