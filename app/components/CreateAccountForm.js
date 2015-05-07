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
  AsyncStorage
} = React;

var Form = t.form.Form;

var User = t.struct({
  username: t.Str,            
  email: t.Str, 
  password: t.Str,
  confirmPassword: t.Str,    
});

var options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true
    },
    confirmPassword: {
      password: true
    }
  }
};

var CreateAccountForm = React.createClass({
  componentWillMount: function() {
  },


  getInitialState: function() {
    return{}
  },


  onPress: function () {
    var value = this.refs.form.getValue();
    if (value) { 
        fetch(`http://4aa88bb3.ngrok.com/users`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: value.username,
            email: value.email,
            password: value.password,
            password_confirmation: value.confirmPassword
          }
        })
      }).then((response) => response.json())
        .then((responseData) => {
          var API_KEY = responseData.user.api_key; 
          AsyncStorage.setItem(API_KEY, responseData.user.api_key)
            .then(() => console.log(API_KEY))
            .done();
          })       
    this.props.navigator.push({
      component: CreateProfile
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
          <Text style={styles.buttonText}>Create Account</Text>
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

module.exports = CreateAccountForm;
