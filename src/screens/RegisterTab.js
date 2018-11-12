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

class RegisterTab extends Component {
	static navigationOptions = {
		tabBarVisible: false
	};

	constructor(props) {
		super(props);

		this.state = {
			email: null,
			username: null,
			password: null
		};
	}

	goToPage() {
		this.props.navigation.navigate("LoginTab");
	}

	handleSubmit() {
		console.log(this.state.username);

		this.goToPage("MarketTab");
	}

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Register</Title>
					</Body>
				</Header>

				<Content>
					<Form>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input
								onChangeText={value =>
									this.setState({ email: value })
								}
							/>
						</Item>
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
						<Item stackedLabel>
							<Label>Password Confirmation</Label>
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
						style={{ margin: 15, marginTop: 25 }}
						onPress={() => this.handleSubmit()}
					>
						<Text>Register</Text>
					</Button>
					<Button
						block
						style={{ margin: 15, marginTop: -10 }}
						onPress={() => this.goToPage()}
					>
						<Text>Login</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default RegisterTab;
