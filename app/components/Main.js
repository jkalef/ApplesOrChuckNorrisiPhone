var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  Navigator
} = React;

var SelectGameMode = require('./SelectGameMode');

var styles = React.StyleSheet.create({
  text: {
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center',
  },

  container: {
    padding: 20,
    marginTop: 60,
    alignItems: 'center'
  },

  button: {
    marginTop: 10,
    height: 30,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    padding: 10
  },

  image: {
    width: 100,
    height: 100,
  }

});

var Main = React.createClass ({ 

  goToSelectGameMode: function() {
    this.props.navigator.push({
      component: SelectGameMode,
    });
  },

  render: function() {
    return (
      <View style={styles.container}> 
        <Text style={styles.text}> Welcome to Apples or Chuck Norris! Ready to Play? </Text>
        <TouchableHighlight style={styles.button} 
                            underlayColor="#99d9f4"
                            onPress={this.goToSelectGameMode} >
          <Text style={styles.buttonText}>Play Now</Text>
        </TouchableHighlight>
      </View>
    );
  },

});

module.exports = Main;

//<Image source={require('image!my_pic.jpeg')} style={styles.image} />


