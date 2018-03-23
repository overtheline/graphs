import * as React from 'react';

import { d3Graph } from './graph';
import { IGraph, processDataToGraph } from './processGraph';

interface IProps {
	title: string;
}

interface IState {
	okToFetchTree: boolean;
	tree?: IGraph;
}

const graphId = 'graph-svg';

export default class App extends React.Component<IProps, IState> {
	updateGraph?: (graph: IGraph) => void;

	constructor(props: IProps) {
		super(props);

		this.state = {
			okToFetchTree: false,
		};

		this.fetchTree = this.fetchTree.bind(this);
	}

	fetchTree() {
		fetch('graph/tree')
			.then((response) => response.json())
			.then((myJson) => {
				this.setState({
					tree: processDataToGraph(myJson.graph),
				});
			});
	}

	componentDidMount() {
		this.fetchTree();
	}

	componentDidUpdate() {
		if (this.state.tree) {
			if (!this.updateGraph) {
				this.updateGraph = d3Graph(graphId, this.state.tree);
				return;
			}

			this.updateGraph(this.state.tree);
		}
	}

	render() {
		return (
			<main>
				<h1>this.props.title</h1>
				<div
					className="control-container"
				>
					<button onClick={this.fetchTree}>
						Generate Tree
					</button>
				</div>
				<svg
					id={graphId}
					height="500"
					width="800"
				/>
			</main>
		);
	}
}
