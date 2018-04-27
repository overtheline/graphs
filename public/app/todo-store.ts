import {
	autorun,
	computed,
	observable,
} from 'mobx';

import {
	ITask,
} from '../../types';

export class ObservableTodoStore {
	@observable todos: ITask[] = [];
	@observable pendingRequests = 0;

	constructor() {
		autorun(() => console.log(this.report));
	}

	@computed get completedTodosCount() {
		return this.todos.filter((todo) => todo.completed).length;
	}

	@computed get report() {
		if (this.todos.length === 0) {
			return '<none>';
		}

		return `Next todo: "${this.todos[0].task}'. `
			+ `Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task: string) {
		this.todos.push({
			assignee: null,
			completed: false,
			task,
		});
	}
}
