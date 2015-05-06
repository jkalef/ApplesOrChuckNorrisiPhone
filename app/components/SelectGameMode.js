var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} = React;

var ShowPictures = require('./ShowPictures');


var styles = React.StyleSheet.create ({
  text: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
  },

  container: {
    padding: 20,
    marginTop: 50,
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
    padding: 15,
    color: 'white',
    alignSelf: 'center',
    fontSize: 18
  }
})


var SelectGameMode = React.createClass ({
  pickCategories: function() {
    this.props.navigator.push({
      component: ShowPictures,
      passProps: {extension: 'category_id=4'}
    })
  },

  playRandom: function() {
    this.props.navigator.push({
      component: ShowPictures,
      passProps: {extension: 'random=true'}
    })
  },

  playChuckNorris: function() {
    this.props.navigator.push({
      component: ShowPictures,
      passProps: {extension: 'chuck_norris=true'}
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please Pick Your Game Mode:</Text>

        <TouchableHighlight style={styles.button} 
                            onPress={this.pickCategories}>
          <Text style={styles.buttonText}>Pick A Category</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
                            onPress={this.playRandom}>
          <Text style={styles.buttonText}>Random</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
                            onPress={this.playChuckNorris}>
          <Text style={styles.buttonText}>Chuck Norris</Text>
        </TouchableHighlight>
      </View>
      );
    },
  });

module.exports = SelectGameMode;