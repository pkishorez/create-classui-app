import * as React from "react";

export interface IAppProps {}

const TestContext = React.createContext("test");
export const TestConsumer = TestContext.Consumer;

export class TestApp extends React.PureComponent<IAppProps, any> {
	state = {
		value: "test"
	};
	update = () => {
		this.setState({
			value: this.state.value + "Hey"
		});
	};
	public render() {
		const value = this.state.value;
		return (
			<TestContext.Provider value={value}>
				{this.props.children}
				<div onClick={this.update}>Button</div>
			</TestContext.Provider>
		);
	}
}

export class TestButton extends React.PureComponent {
	func = (val: any) => val;
	render() {
		return (
			<div>
				<TestConsumer>{this.func}</TestConsumer>
			</div>
		);
	}
}
