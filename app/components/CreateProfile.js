var React = require('react-native');

var t = require('tcomb-form-native');
var SelectGameMode = require('./SelectGameMode');
var ngrokurl = require('../ngrok');

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
var pic = "http://cdn.inquisitr.com/wp-content/uploads/2012/09/Chuck-Norris-Slovakian-Bridge.jpg";

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var Profile = t.struct({
  age: t.maybe(t.Num),            
  location: t.maybe(t.Str), 
  gender: t.maybe(t.Str)
});

var options = {
  auto: 'placeholders',
  autoCorrect: 'false',
  fields: {
    age: {
      autoCorrect: false,
      autoFocus: true,
    },
    location: {
      autoCorrect: false,
      bufferDelay: 500,
    },
    gender: {
      autoCorrect: false,
      bufferDelay: 500,
    }
  }
};

var CreateProfile = React.createClass({
  componentWillMount: function() {
    AsyncStorage.getItem('API_KEY')
      .then((apikey) => {
        this.setState({userKey: apikey})
      })
    },


  getInitialState: function() {
    return{}
  },


  onPress: function () {
    var value = this.refs.form.getValue();
    if (value) { 
        fetch(`${ngrokurl}/api/v1/profiles/${this.state.userKey}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profile: {
            age: value.age,
            location: value.location,
            sex: value.gender
          }
        })
      });
    this.props.navigator.replace({
      component: SelectGameMode
    });
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage} 
               source={{uri: pic}}
               backgroundImage={Image.resizeMode.cover} />
        <View style={styles.backdropView}>
          <Form
            ref="form"
            type={Profile}
            options={options}
            value={Profile} >
          </Form>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Update Profile</Text>
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
    marginTop: 30,
    height: 250,
    width: 500,
    padding: 20,
    flex: 0,
    backgroundColor: 'rgba(250,250,250,0.9)',
    borderRadius: 10
  },
});


module.exports = CreateProfile;