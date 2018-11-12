import React, { Component } from "react";
import { Linking, Image } from "react-native";
import {
	Body,
	Button,
	Card,
	CardItem,
	Container,
	Content,
	Left,
	Spinner,
	Text,
	Thumbnail
} from "native-base";

import axios from "axios/index";
import variable from "../theme/variables/platform";

class NewsTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null
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
		const URL = "http://127.0.0.1:4000/api/news?l=50";

		return axios
			.get(`${URL}`)
			.then(res => {
				this.setState({ news: res.data });
			})
			.catch(err => {
				console.error(err);
			});
	}

	trunc(text, chars) {
		return text.length > chars ? `${text.substr(0, chars)}...` : text;
	}

	list() {
		const state = this.state;

		if (state.news == null) {
			return (
				<Container>
					<Content>
						<Spinner />
					</Content>
				</Container>
			);
		} else {
			const news = state.news.rows;

			return news.map((news, index) => {
				return (
					<Card style={{ elevation: 3 }} key={index}>
						<CardItem>
							<Left>
								<Thumbnail source={{ uri: news.image }} />
								<Body>
									<Text
										onPress={() =>
											Linking.openURL(news.url)
										}
									>
										{this.trunc(news.title, 40)}
									</Text>
									<Text note>{news.date}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem cardBody>
							<Body>
								<Image
									onPress={() => Linking.openURL(news.url)}
									source={{ uri: news.image }}
									style={{
										width: variable.deviceWidth,
										flex: 1,
										height: 140
									}}
								/>
								<Text
									style={{
										marginTop: 10,
										paddingRight: 5,
										paddingLeft: 5
									}}
								>
									{this.trunc(news.overview, 120)}
								</Text>
								<Left>
									<Button
										transparent
										textStyle={{ color: "#87838B" }}
									>
										<Text
											onPress={() =>
												Linking.openURL(news.url)
											}
										>
											Read more
										</Text>
									</Button>
								</Left>
							</Body>
						</CardItem>
					</Card>
				);
			});
		}
	}

	render() {
		return (
			<Container>
				<Content>{this.list()}</Content>
			</Container>
		);
	}
}

export default NewsTab;
