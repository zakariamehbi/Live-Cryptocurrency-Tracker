import React, { Component } from "react";
import { YellowBox } from "react-native";
import { Button, Footer, FooterTab, Icon, Root, Text } from "native-base";
import { TabNavigator } from "react-navigation";

import CoinTab from "./screens/CoinTab";
import HomeTab from "./screens/HomeTab";
import LoginTab from "./screens/LoginTab";
import MarketTab from "./screens/MarketTab";
import NewsTab from "./screens/NewsTab";
import RegisterTab from "./screens/RegisterTab";
import SearchTab from "./screens/SearchTab";

const AppNavigator = TabNavigator(
	{
		LoginTab: { screen: LoginTab },
		HomeTab: { screen: HomeTab },
		MarketTab: { screen: MarketTab },
		CoinTab: { screen: CoinTab },
		NewsTab: { screen: NewsTab },
		RegisterTab: { screen: RegisterTab },
		SearchTab: { screen: SearchTab }
	},
	{
		tabBarPosition: "bottom",
		tabBarOptions: {
			activeTintColor: "#e91e63",
			labelStyle: {
				fontSize: 5
			},
			style: {
				backgroundColor: "red"
			}
		},
		tabBarComponent: props => {
			return (
				<Footer>
					<FooterTab>
						<Button
							vertical
							active={props.navigationState.index === 0}
							onPress={() => props.navigation.navigate("HomeTab")}
						>
							<Icon
								name="home"
								style={{ fontSize: 20, color: "white" }}
							/>
							<Text>Home</Text>
						</Button>
						<Button
							vertical
							active={props.navigationState.index === 1}
							onPress={() =>
								props.navigation.navigate("MarketTab")
							}
						>
							<Icon
								name="trending-up"
								style={{ fontSize: 20, color: "white" }}
							/>
							<Text>Market</Text>
						</Button>
						<Button
							vertical
							active={props.navigationState.index === 2}
							onPress={() => props.navigation.navigate("NewsTab")}
						>
							<Icon
								name="md-book"
								style={{ fontSize: 20, color: "white" }}
							/>
							<Text>News</Text>
						</Button>
						<Button
							vertical
							active={props.navigationState.index === 3}
							onPress={() =>
								props.navigation.navigate("SearchTab")
							}
						>
							<Icon
								name="search"
								style={{ fontSize: 20, color: "white" }}
							/>
							<Text>Search</Text>
						</Button>
					</FooterTab>
				</Footer>
			);
		}
	}
);

export default class App extends Component {
	render() {
		return (
			<Root>
				<AppNavigator />
			</Root>
		);
	}
}

YellowBox.ignoreWarnings(["Warning:", "Remote", "Setting"]);
