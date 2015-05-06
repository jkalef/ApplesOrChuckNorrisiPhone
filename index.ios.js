/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
} = React;

var Main = require('./app/components/Main');
//var SelectGameMode = require('./app/components/SelectGameMode');
var ShowPictures = require('./app/components/ShowPictures');

//this is the main component
var AwesomeProject = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          title: "Apples or Chuck Norris",
          component: Main
        }} />
    );
  }
});

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
