import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
	Body,
	Container,
	Content,
	Header,
	Left,
	View,
	Button,
	List,
	ListItem,
	Right,
	Text,
	Thumbnail,
	Title
} from "native-base";

class HomeTab extends Component {
	constructor(props) {
		super();

		this.state = {
			coins: []
		};
	}

	componentWillReceiveProps(props) {
		this.addFav(props.navigation.state.params.coins);
	}

	addFav(coin) {
		let newState = Object.assign({}, this.state);
		let fooArray = newState.coins;
		let index = fooArray.length;

		fooArray[index] = coin;
		fooArray = fooArray.filter((x, i, a) => a.indexOf(x) == i);

		this.setState({ coins: fooArray });
	}

	goToPage(name, data = null) {
		this.props.navigation.navigate(name, { coin: data });
	}

	renderRow(coin, index) {
		if (coin != null) {
			let timestamp = Date.now();

			return (
				<TouchableOpacity key={index}>
					<ListItem
						avatar
						noBorder={true}
						onPress={() => this.goToPage("CoinTab", coin)}
					>
						<Left>
							<Thumbnail
								size={5}
								small={true}
								circular={false}
								source={{
									uri:
										"https://www.cryptocompare.com" +
										coin.image
								}}
							/>
						</Left>
						<Body>
							<Text>{coin.name}</Text>
						</Body>
						<Left style={{ marginRight: 20 }}>
							<Text>${parseFloat(coin.price)}</Text>
						</Left>
						<Right style={{ marginTop: 5 }}>
							<Thumbnail
								size={5}
								small={true}
								square={false}
								source={{
									uri:
										"https://images.cryptocompare.com/sparkchart/" +
										coin.name +
										"/USD/latest.png?ts=" +
										timestamp
								}}
							/>
						</Right>
					</ListItem>
				</TouchableOpacity>
			);
		}
	}

	render() {
		const state = this.state;

		if (state.coins[0] != null) {
			const coins = state.coins;

			return (
				<Container>
					<Header>
						<Body>
							<Title>Home</Title>
						</Body>
					</Header>

					<Content>
						<List>
							{coins.map((coin, index) => {
								return this.renderRow(coin, index);
							})}
						</List>
					</Content>
				</Container>
			);
		} else {
			return (
				<Container>
					<Header>
						<Body>
							<Title>Home</Title>
						</Body>
					</Header>

					<Content>
						<View
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<View
								style={{
									marginTop: 30,
									width: 220,
									height: 400
								}}
							>
								<Text style={{ textAlign: "center" }}>
									Looks like you're not following any coins
									yet!
								</Text>
								<Text
									style={{
										textAlign: "center",
										marginTop: 10
									}}
									note
								>
									Start by searching for a coin you are
									interested in or browsing top coins.
								</Text>

								<Button
									block
									style={{ marginTop: 10 }}
									onPress={() => this.goToPage("MarketTab")}
								>
									<Text>Browse top coins</Text>
								</Button>
								<Button
									block
									style={{ marginTop: 15 }}
									onPress={() => this.goToPage("SearchTab")}
								>
									<Text>Search for a coin</Text>
								</Button>
							</View>
						</View>
					</Content>
				</Container>
			);
		}
	}
}

export default HomeTab;
