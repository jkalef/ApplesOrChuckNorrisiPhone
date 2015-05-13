var React = require('react-native');

var {
  StyleSheet,
  TabBarIOS,
  Navigator,
  Text,
  View
} = React;

var TabBarItemIOS = TabBarIOS.Item;

// var SelectGameMode = require("./SelectGameMode");
// var CreateProfile = require("./CreateProfile");
// var SignIn = require("./SignIn");

var Tabs = React.createClass({

 getInitialState: function() {
    return {
      selectedTab: "Play Game"
    };
  },

  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === "Play Game"}
          onPress={() => {
            this.setState({
              selectedTab: "Play Game",
            });
          }}>
            <SelectGameMode />
        </TabBarIOS.Item>
        <TabBarIOS.Item 
          selected={this.state.selectedTab === "Profile"}
          onPress={() => {
            this.setState({
              selectedTab: "Profile",
            });
          }}>
            <CreateProfile />
        </TabBarIOS.Item>
      </TabBarIOS>
      )
    },
  });

module.exports = Tabs;