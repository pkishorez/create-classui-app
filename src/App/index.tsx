import * as React from "react";
import { ClassUI } from "classui/ClassUI";
import { NavBar } from "classui/Navbar";
import { Icon } from "classui/Helper/Icon";
interface IProps {}
export class App extends React.Component<IProps, any> {
	render() {
		return (
			<ClassUI fullHeight>
				<NavBar logo="Class-UI" />
				<Icon>face</Icon>
			</ClassUI>
		);
	}
}
