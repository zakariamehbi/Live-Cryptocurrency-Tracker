import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
	Body,
	Button,
	Container,
	Content,
	Header,
	Icon,
	Input,
	Item,
	Left,
	List,
	ListItem,
	Text,
	Thumbnail
} from "native-base";

import axios from "axios/index";

class SearchTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coins: null
		};
	}

	search(keyword) {
		const URL = "http://127.0.0.1:4000/api/search/" + keyword;

		return axios
			.get(`${URL}`)
			.then(res => {
				this.setState({ coins: res });
			})
			.catch(err => {
				console.error(err);
			});
	}

	goToPage(coin) {
		this.props.navigation.navigate("CoinTab", { coin: coin });
	}

	list() {
		const state = this.state;

		if (state.coins != null) {
			const coins = state.coins.data;

			return (
				<List>
					{coins.map((coin, index) => {
						return (
							<TouchableOpacity key={index}>
								<ListItem
									avatar
									onPress={() => this.goToPage(coin)}
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
								</ListItem>
							</TouchableOpacity>
						);
					})}
				</List>
			);
		}
	}

	render() {
		return (
			<Container>
				<Header searchBar rounded>
					<Item>
						<Icon name="search" />
						<Input
							placeholder="Search"
							onChangeText={text => this.search(text)}
							onClear={text => this.search(text)}
						/>
					</Item>
					<Button transparent>
						<Text>Search</Text>
					</Button>
				</Header>
				<Content>{this.list()}</Content>
			</Container>
		);
	}
}

export default SearchTab;
