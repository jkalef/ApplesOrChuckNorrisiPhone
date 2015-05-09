var React = require('react-native');
var t = require('tcomb-form-native');
var Main = require('./Main');
var CreateProfile = require('./CreateProfile');

var { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
  TextInput,
  Navigator,
  AsyncStorage,
  AlertIOS
} = React;

var Form = t.form.Form;

var User = t.struct({            
  email: t.Str, 
  password: t.Str,   
});

var options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true
    },
  }
};

var SignIn = React.createClass({
  componentWillMount: function() {
  },


  getInitialState: function() {
    return{}
  },

  //when the user submits an email and password, I want to do
  //a couple things:
  //1) I want to find the user by email:..if user doesn't exist, through an error
  //2) I want to make sure that this password matches the email, and if not, through an error
  //3) IF the email and password match, I want to fetch the authenticity token and store it
  //4) in ASYNC Storage


  onPress: function () {
    var value = this.refs.form.getValue();
    if (value) {  
        fetch(`http://4779340a.ngrok.com/api/v1/sessions`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: value.email,
            password: value.password,
          }
        })
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.user.api_key != null) {
            AsyncStorage.setItem('API_KEY', responseData.user.api_key)
              .done();
          } else {
              AlertIOS.alert(
            'Error:',
            'Invalid username and/or password',
            [
              {text: 'Ok', onPress: () => console.log('Pressed')},
            ]
          ) 
          }
        });   
    this.props.navigator.replace({
      component: Main
    });
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
          value={User} >
        </Form>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = React.StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


module.exports = SignIn;