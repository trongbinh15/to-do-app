import React, { Component, DragEventHandler } from 'react'
import { ItemModel } from '../../models/item.model';
import './item.styles.css'
type Prop = {
	item: ItemModel;
	onDelete: (id: number) => void;
	onChangeStatus: () => void;
	onDragStart: (e: DragEventHandler<HTMLDivElement>) => void;
	onDragOver: (e: DragEventHandler<HTMLDivElement>) => void;
	onDragEnd: (e: DragEventHandler<HTMLDivElement>) => void;
};


export class Item extends Component<Prop> {
	handleDeleteEvent = () => this.props.onDelete(this.props.item.id);
	handleChangeStatueEvent = () => this.props.onChangeStatus();
	handleOnDragStart = (e: any) => this.props.onDragStart(e);
	handleOnDragEnd = (e: any) => this.props.onDragOver(e);

	shouldComponentUpdate(nextProp: any) {
		return this.props.item.isComplete !== nextProp.item.isComplete
	}


	render() {
		return (
			<div className="item-container">
				<div
					onDragStart={this.handleOnDragStart}
					onDragOver={this.handleOnDragEnd}
					onDragEnd={this.handleOnDragEnd} draggable>✌</div>
				<input type="checkbox"
					className="check-box"
					defaultChecked={this.props.item.isComplete}
					onChange={this.handleChangeStatueEvent}
					onClick={this.handleChangeStatueEvent} />
				<div>{this.props.item.name}</div>
				<i className="fas fa-trash-alt"></i>
				{/* <button onClick={this.handleDeleteEvent}>Delete</button> */}
				{/* <button onClick={this.handleChangeStatueEvent}>Change Status</button> */}
			</div>
		)
	}
}

export default Item
