import React from "react";
import { ClassUI } from "classui/ClassUI";
import { Content } from "classui/Content";
import { Button } from "classui/Components/Button";
import { Counter } from "classui/Helper/Counter";
interface IProps {}

(window as any).React2 = React;
export class App extends React.Component<IProps, any> {
	state = {
		number: 9990
	};
	componentDidMount() {
		setInterval(
			() =>
				this.setState({
					number: this.state.number + 1
				}),
			500
		);
	}
	render() {
		return (
			<ClassUI fullHeight>
				<Content>
					<Counter
						number={this.state.number}
						pad={5}
						style={{fontSize: 40, color: "green"}}
					/>
					<Button>Kishore</Button>
				</Content>
			</ClassUI>
		);
	}
}
