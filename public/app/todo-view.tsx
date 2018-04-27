import { observer } from 'mobx-react';
import * as React from 'react';
import { render } from 'react-dom';
import { ITask } from '../../types';

interface IProps {
	todo: ITask;
}

@observer
export class TodoView extends React.Component<IProps, any> {
	onToggleCompleted = () => {
		const todo = this.props.todo;
		todo.completed = !todo.completed;
	}

	onRename = () => {
		const todo = this.props.todo;
		todo.task = prompt('Task name', todo.task) || todo.task;
	}

	render() {
		const todo = this.props.todo;
		return (
			<li
				onDoubleClick={this.onRename}
			>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={this.onToggleCompleted}
				/>
				{todo.task}
				{todo.assignee ? <small>{todo.assignee.name}</small> : null}
			</li>
		);
	}
}
