var React = require('react-native');

var t = require('tcomb-form-native');
var Main = require('./Main');

var { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
  TextInput,
  Navigator
} = React;

var Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

var Profile = t.struct({
  age: t.maybe(t.Num),            
  location: t.maybe(t.Str), 
  //gender: Gender
});

var options = {
  auto: 'placeholders',
};

var CreateProfile = React.createClass({
  componentWillMount: function() {
  },


  getInitialState: function() {
    return{}
  },


  onPress: function () {
    var value = this.refs.form.getValue();
    if (value) { 
        fetch(`http://4aa88bb3.ngrok.com/profiles`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profile: {
            age: value.age,
            location: value.location,
            //sex: value.gender
          }
        })
      });
    this.props.navigator.push({
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
          type={Profile}
          options={options}
          value={Profile} >
        </Form>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Create Profile</Text>
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


module.exports = CreateProfile;