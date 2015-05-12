var React = require('react-native');
var t = require('tcomb-form-native');
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
  Image
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

var chuckPicture = "http://www.onrembobine.fr/wp-content/uploads/2012/08/Chuck_Norris-Dodgeball1.jpg"

var CreateAccountForm = React.createClass({
  componentWillMount: function() {
    //var API_KEY = "";
  },


  getInitialState: function() {
    return{}
  },


  onPress: function () {
    var value = this.refs.form.getValue();
    if (value) { 
        fetch(`http://4779340a.ngrok.com/api/v1/users`, {
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
          AsyncStorage.setItem('API_KEY', responseData.user.api_key)
            .done();
          this.props.navigator.replace({
            component: CreateProfile
          });
        }).catch((error) => AlertIOS.alert(
            'Sorry',
            'Something went wrong. Please try again.',
            [
              {text: 'Try Again', onPress: () => console.log('Pressed')},
            ]
          ))       
        }
      },

  render: function() {
    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage} 
               source={{uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS1wKVVbbZKcMRpycAxggnSYCmWT1QViAxMRUfBaV6T-R2erfqH"}}
               backgroundImage={Image.resizeMode.cover} />
        <View style={styles.backdropView}>
          <Form
            ref="form"
            type={User}
            options={options}
            value={User} >
          </Form>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
});


var styles = React.StyleSheet.create({

  container: {
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },

  formContainer: {
    backgroundColor: 'white'
  },

  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },

  button: {
    marginTop: 5,
    marginLeft: 10,
    flex: 0,
    backgroundColor: '#48BBEC',
  },

  backgroundImage: {
    flex: 1,
    width: 800,
    height: 400,
    top: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.5
  },

  backdropView: {
    height: 300,
    width: 500,
    padding: 20,
    flex: 0,
    backgroundColor: 'rgba(250,250,250,0.7)',
    borderRadius: 10
  },

});

module.exports = CreateAccountForm;
