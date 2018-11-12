import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
	Body,
	Button,
	Container,
	Content,
	Header,
	Left,
	List,
	ListItem,
	Right,
	Segment,
	Spinner,
	Text,
	Icon
} from "native-base";
import { LineChart } from "react-native-chart-kit";
import variable from "../theme/variables/platform";
import axios from "axios/index";
import millify from "millify";

const chartConfig = {
	backgroundColor: variable.androidMainColor,
	backgroundGradientFrom: variable.androidMainColor,
	backgroundGradientTo: variable.androidMainColor,
	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	style: {
		borderRadius: 16
	}
};

class CoinTab extends Component {
	constructor(props) {
		super();

		this.state = {
			color: "grey",
			coin: props.navigation.getParam("coin", null),
			price: 0,
			ohlc: null,
			seg: 1
		};
	}

	componentWillMount() {
		this.getPrice();
		this.getOHLC();
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.getOHLC();
			this.getPrice();
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentWillReceiveProps(props) {
		this.setState({ coin: props.navigation.state.params.coin });
		this.setState({ price: props.navigation.state.params.coin.price });
		this.setState({ ohlc: null });
		this.setState({ seg: 1 });
		this.setState({ color: "grey" });
	}

	getPrice() {
		if (this.state.coin != null) {
			const URL =
				"http://127.0.0.1:4000/api/data/" +
				this.state.coin.name +
				"/price";

			return axios
				.get(`${URL}`)
				.then(res => {
					this.setState({ price: res.data });
				})
				.catch(err => {
					console.error(err);
				});
		}
	}

	getOHLC() {
		if (this.state.coin != null) {
			let timeframe;

			switch (this.state.seg) {
				case 1:
					timeframe = "hour";
					break;

				case 2:
					timeframe = "day";
					break;

				case 3:
					timeframe = "week";
					break;

				case 4:
					timeframe = "month";
					break;

				case 5:
					timeframe = "year";
					break;
			}

			const URL =
				"http://127.0.0.1:4000/api/hist/" +
				this.state.coin.name +
				"/" +
				timeframe;

			return axios
				.get(`${URL}`)
				.then(res => {
					this.setState({ ohlc: res.data });
				})
				.catch(err => {
					console.error(err);
				});
		}
	}

	arrayColumn(arr, n) {
		return arr.map(x => x[n]);
	}

	goToPage(pageName, data) {
		this.props.navigation.navigate(pageName, { coins: data });
	}

	render() {
		let state = this.state;

		if (state.coin == null || state.ohlc == null) {
			this.getPrice();
			this.getOHLC();

			return (
				<Container>
					<Content>
						<Spinner />
					</Content>
				</Container>
			);
		} else {
			let data = {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June"
				],
				datasets: [
					{
						data: this.arrayColumn(state.ohlc, "close")
					}
				]
			};

			var infos = [
				[
					"Marketcap",
					"$" + millify(parseFloat(state.coin.marketcap, 2))
				],
				["24h Volume", "$" + millify(parseFloat(state.coin.volume, 2))],
				["Price", "$" + millify(parseFloat(state.price.close, 2))],
				["24h Change", state.coin.change24 + "%"],
				["Prooftype", state.coin.prooftype],
				["Algorithm", state.coin.algorithm],
				["Name", state.coin.name],
				["Fullname", state.coin.fullname]
			];

			return (
				<Container>
					<Header>
						<Body style={{ flex: 1 }}>
							<Left style={{ marginTop: 10 }}>
								<Text style={{ fontSize: 20, color: "white" }}>
									{state.coin.fullname} - $
									{parseFloat(state.price.close)}
									<Text
										style={{
											color: variable.androidMainColor
										}}
									>
										--
									</Text>
									<Icon
										style={{
											fontSize: 20,
											color: state.color
										}}
										type="Foundation"
										name="heart"
										onPress={() => {
											if (state.color == "grey") {
												this.setState({ color: "red" });
												this.goToPage(
													"HomeTab",
													state.coin
												);
											} else {
												this.setState({
													color: "grey"
												});
											}
										}}
									/>
								</Text>
							</Left>
						</Body>
					</Header>
					<Content style={{ marginTop: -15, flex: 1 }}>
						<LineChart
							data={data}
							width={variable.deviceWidth}
							height={220}
							withDots={false}
							chartConfig={chartConfig}
							style={{
								marginVertical: 8,
								marginTop: 0,
								borderRadius: 0
							}}
							bezier
						/>

						<Segment
							style={{
								marginTop: -40,
								backgroundColor: variable.androidMainColor
							}}
						>
							<Button
								first
								active={state.seg === 1 ? true : false}
								onPress={() =>
									this.setState({ seg: 1 }, () => {
										this.getOHLC();
									})
								}
							>
								<Text style={{ fontSize: 10 }}>Hour</Text>
							</Button>
							<Button
								active={state.seg === 2 ? true : false}
								onPress={() =>
									this.setState({ seg: 2 }, () => {
										this.getOHLC();
									})
								}
							>
								<Text style={{ fontSize: 10 }}>Day</Text>
							</Button>
							<Button
								active={state.seg === 3 ? true : false}
								onPress={() =>
									this.setState({ seg: 3 }, () => {
										this.getOHLC();
									})
								}
							>
								<Text style={{ fontSize: 10 }}>Week</Text>
							</Button>
							<Button
								active={state.seg === 4 ? true : false}
								onPress={() =>
									this.setState({ seg: 4 }, () => {
										this.getOHLC();
									})
								}
							>
								<Text style={{ fontSize: 10 }}>Month</Text>
							</Button>
							<Button
								last
								active={state.seg === 5 ? true : false}
								onPress={() =>
									this.setState({ seg: 5 }, () => {
										this.getOHLC();
									})
								}
							>
								<Text style={{ fontSize: 10 }}>Year</Text>
							</Button>
						</Segment>

						<List>
							{infos.map((info, index) => {
								return (
									<TouchableOpacity key={index}>
										<ListItem>
											<Left>
												<Text>{info[0]}</Text>
											</Left>
											<Right>
												<Text
													style={{ marginLeft: -10 }}
													numberOfLines={1}
												>
													{info[1]}
												</Text>
											</Right>
										</ListItem>
									</TouchableOpacity>
								);
							})}
						</List>
					</Content>
				</Container>
			);
		}
	}
}

export default CoinTab;
