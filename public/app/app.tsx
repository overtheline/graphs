import * as React from 'react';
import styled from 'styled-components';

import {
	IGraph,
	IVertex,
} from '../../types';

interface IProps {
	title: string;
}

interface IState {
	graph?: IGraph;
	alphaDecay: number;
	alphaMin: number;
	alphaTarget: number;
	branches: number;
	velocityDecay: number;
	vertices: number;
}

const graphId = 'graph-svg';
const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(5, 1fr);
`;
const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
`;
const TitleWrapper = styled.section`
  padding: 1em;
	background: #DDD;
	grid-column: 1 / 9;
	grid-row: 1;
`;
const ControlsWrapper = styled.div`
	grid-column: 1 / 3;
	grid-row: 2 / 6;
`;
const ControlContainer = styled.div`
	padding: 5px 10px;
`;
const ViewWrapper = styled.div`
	grid-column: 3 / 9;
	grid-row: 2 / 6;
`;

const initialAlphaDecay = 2;
const initialAlphaMin = 1;
const initialAlphaTarget = 0;
const initialBranches = 3;
const initialVelocityDecay = 40;
const initialVertices = 12;

export default class App extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			alphaDecay: initialAlphaDecay,
			alphaMin: initialAlphaMin,
			alphaTarget: initialAlphaTarget,
			branches: initialBranches,
			velocityDecay: initialVelocityDecay,
			vertices: initialVertices,
		};

		this.fetchTree = this.fetchTree.bind(this);
		this.alphaMinSlider = this.alphaMinSlider.bind(this);
		this.alphaDecaySlider = this.alphaDecaySlider.bind(this);
		this.alphaTargetSlider = this.alphaTargetSlider.bind(this);
		this.branchesSlider = this.branchesSlider.bind(this);
		this.verticesSlider = this.verticesSlider.bind(this);
		this.velocityDecaySlider = this.velocityDecaySlider.bind(this);
	}

	fetchTree() {
		const {
			branches,
			vertices,
		} = this.state;

		fetch(`graph/tree/k/${branches}/n/${vertices}`)
			.then((response) => response.json())
			.then((myJson) => {
				this.setState({
					graph: myJson.graph,
				});
			});
	}

	alphaMinSlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ alphaMin: value });
	}

	alphaDecaySlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ alphaDecay: value });
	}

	alphaTargetSlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ alphaTarget: value });
	}

	branchesSlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ branches: value });
	}

	velocityDecaySlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ velocityDecay: value });
	}

	verticesSlider(event: any) {
		const value: number = Number(event.target.value);
		this.setState({ vertices: value });
	}

	render() {
		const {
			alphaDecay,
			alphaMin,
			alphaTarget,
			branches,
			velocityDecay,
			vertices,
		} = this.state;

		return (
			<Wrapper>
				<TitleWrapper>
					<Title>
						{this.props.title}
					</Title>
				</TitleWrapper>
				<ControlsWrapper>
					<ControlContainer>
						<button onClick={this.fetchTree}>
							Generate Tree
						</button>
					</ControlContainer>
					<ControlContainer>
						<div>{`branches: ${branches}`}</div>
						<input
							type="range"
							min="0"
							max="7"
							value={branches}
							className="slider"
							id="branches-slider"
							onChange={this.branchesSlider}
						/>
					</ControlContainer>
					<ControlContainer>
						<div>{`vertices: ${vertices}`}</div>
						<input
							type="range"
							min="2"
							max="100"
							value={vertices}
							className="slider"
							id="vertices-slider"
							onChange={this.verticesSlider}
						/>
					</ControlContainer>
					<ControlContainer>
						<div>{`alphaDecay: ${alphaDecay}`}</div>
						<input
							type="range"
							min="0"
							max="100"
							value={alphaDecay}
							className="slider"
							id="alpha-decay-slider"
							onChange={this.alphaDecaySlider}
						/>
					</ControlContainer>
					<ControlContainer>
						<div>{`alphaMin: ${alphaMin}`}</div>
						<input
							type="range"
							min="0"
							max="100"
							value={alphaMin}
							className="slider"
							id="alpha-min-slider"
							onChange={this.alphaMinSlider}
						/>
					</ControlContainer>
					<ControlContainer>
						<div>{`alphaTarget: ${alphaTarget}`}</div>
						<input
							type="range"
							min="0"
							max="100"
							value={alphaTarget}
							className="slider"
							id="alpha-target-slider"
							onChange={this.alphaTargetSlider}
						/>
					</ControlContainer>
					<ControlContainer>
						<div>{`velocityDecay: ${velocityDecay}`}</div>
						<input
							type="range"
							min="0"
							max="100"
							value={velocityDecay}
							className="slider"
							id="velocity-decay-slider"
							onChange={this.velocityDecaySlider}
						/>
					</ControlContainer>
				</ControlsWrapper>
				<ViewWrapper>
					<svg
						id={graphId}
						height="200"
						width="300"
					/>
				</ViewWrapper>
			</Wrapper>
		);
	}
}
