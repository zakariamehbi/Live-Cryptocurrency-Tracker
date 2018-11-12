import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
	Body,
	Container,
	Content,
	Left,
	List,
	ListItem,
	Right,
	Spinner,
	Text,
	Thumbnail
} from "native-base";
import millify from "millify";
import axios from "axios/index";

class MarketTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coins: null
		};
	}

	componentWillMount() {
		this.getData();
	}

	componentDidMount() {
		this.interval = setInterval(() => this.getData(), 120000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getData() {
		const URL = "http://127.0.0.1:4000/api/coins/data?l=50";

		return axios
			.get(`${URL}`)
			.then(res => {
				this.setState({ coins: res.data });
			})
			.catch(err => {
				console.error(err);
			});
	}

	goToPage(coin) {
		this.props.navigation.navigate("CoinTab", { coin: coin });
	}

	renderRow(coin, index) {
		let timestamp = Date.now();

		return (
			<TouchableOpacity key={index}>
				<ListItem
					avatar
					noBorder={true}
					onPress={() => this.goToPage(coin)}
				>
					<Left>
						<Thumbnail
							size={5}
							small={true}
							circular={false}
							source={{
								uri:
									"https://www.cryptocompare.com" + coin.image
							}}
						/>
					</Left>
					<Body>
						<Text>{coin.name}</Text>
					</Body>
					<Left style={{ marginRight: 20 }}>
						<Text>${parseFloat(coin.price).toFixed(2)}</Text>
					</Left>
					<Left style={{ marginRight: 10 }}>
						<Text>${millify(parseFloat(coin.marketcap), 1)}</Text>
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

	render() {
		const state = this.state;

		if (state.coins == null) {
			return (
				<Container>
					<Content>
						<Spinner />
					</Content>
				</Container>
			);
		} else {
			const coins = state.coins.rows;

			return (
				<Container>
					<Content>
						<List>
							{coins.map((coin, index) => {
								return this.renderRow(coin, index);
							})}
						</List>
					</Content>
				</Container>
			);
		}
	}
}

export default MarketTab;
