import React, { Component } from "react";
import {
	Body,
	Button,
	Container,
	Content,
	Form,
	Header,
	Input,
	Item,
	Label,
	Text,
	Title
} from "native-base";

class LoginTab extends Component {
	static navigationOptions = {
		tabBarVisible: false
	};

	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		};
	}

	goToPage(page) {
		this.props.navigation.navigate(page);
	}

	handleSubmit() {
		this.goToPage("HomeTab");
	}

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Login</Title>
					</Body>
				</Header>

				<Content>
					<Form>
						<Item stackedLabel>
							<Label>Username</Label>
							<Input
								onChangeText={value =>
									this.setState({ username: value })
								}
							/>
						</Item>
						<Item stackedLabel>
							<Label>Password</Label>
							<Input
								onChangeText={value =>
									this.setState({ password: value })
								}
								secureTextEntry
							/>
						</Item>
					</Form>
					<Button
						block
						style={{ margin: 15, marginTop: 50 }}
						onPress={() => this.handleSubmit()}
					>
						<Text>Login</Text>
					</Button>
					<Button
						block
						style={{ margin: 15, marginTop: 1 }}
						onPress={() => this.goToPage("RegisterTab")}
					>
						<Text>Register</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default LoginTab;
