var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  Navigator,
} = React;

var SelectGameMode = require('./SelectGameMode');
var CreateAccountForm = require('./CreateAccountForm');
var SignIn = require('./SignIn');
var SelectGameMode = require('./SelectGameMode');
var CreateProfile = require('./CreateProfile');

var styles = React.StyleSheet.create({

  backgroundImage: {
    flex: 1,
    // width: 800,
    // height: 400,
    // top: 0,
    // left: 0,
    // position: 'absolute',
    // opacity: 1
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  text: {
    marginBottom: 10,
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },

  container: {
    // padding: 20,
    marginTop: 50,
    alignItems: 'stretch',
    // marginRight: 250,
    flex: 1,
  },

  signInButton: {
    marginTop: 5,
    height: 30,
    marginLeft: 83,
    flex: 0,
    backgroundColor: 'red',
  },

  // button: {
  //   marginTop: 10,
  //   height: 30,
  //   marginLeft: 10,
  //   flex: 0,
  //   backgroundColor: '#48BBEC',
  // },

  buttonText: {
    padding: 18,
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },

  backdropView: {
    marginTop: 15,
    marginLeft: 10,
    padding: 5,
    width: 320,
    flex: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },

});

var Main = React.createClass ({ 
  goToSignUp: function() {
    this.props.navigator.push({
      component: CreateAccountForm,
      title: "Create Your Account"
    });
  },

  goToSignIn: function() {
    this.props.navigator.push({
      component: SignIn,
      title: "Sign In"
    });
  },

  goToSelectGameMode: function() {
    this.props.navigator.push({
      component: SelectGameMode,
      title: "Select Game Mode",
    });
  },

  render: function() {
    return (
      <View style={styles.container}> 
        <Image style={styles.backgroundImage} 
               source={{uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS1wKVVbbZKcMRpycAxggnSYCmWT1QViAxMRUfBaV6T-R2erfqH"}}>
          <View style={styles.backdropView}>
            <Text style={styles.text}> Welcome to Apples or Chuck Norris!</Text>  
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.signInButton} 
                                  underlayColor="#99d9f4"
                                  onPress={this.goToSelectGameMode} >
                  <Text style={styles.buttonText}>Play Now</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Image>
      </View>

    );
  },

});

module.exports = Main;



