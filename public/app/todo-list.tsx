import { observer } from 'mobx-react';
import * as React from 'react';

import { ObservableTodoStore } from './todo-store';
import { TodoView } from './todo-view';

interface IProps {
	store: ObservableTodoStore;
}

@observer
export class TodoList extends React.Component<IProps, any> {
	onNewTodo = () => {
		this.props.store.addTodo(prompt('Enter a new todo:', 'coffe plz') || '');
	}

	render() {
		const store = this.props.store;
		return (
			<div>
				{store.report}
				<ul>
					{store.todos.map((todo, index) => <TodoView todo={todo} key={index} />)}
				</ul>
				<button onClick={this.onNewTodo}>New Todo</button>
			</div>
		);
	}
}
