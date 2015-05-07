var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  PickerIOS,
  ScrollView,
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
    marginTop: 50
  },

  buttonContainer: {
    alignItems: 'center',
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
});

var PickerItemIOS = PickerIOS.Item;

var CategoryPicker = React.createClass({
  componentWillMount: function() {
    // React.AlertIOS.alert(this.state.categories.length.toString())
    fetch(`http://4aa88bb3.ngrok.com/play/categories.json`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({categories: responseData.categories});
      });
  },

  getInitialState: function() {
    return {categories: []}
  },

  renderPicker() {
    var categories = this.state.categories ? this.state.categories : [];;
    return (
      <PickerIOS
        selectedValue={this.state.categoryId}
        key={"picker-" + this.state.categories.length.toString()}
        onValueChange={(categoryId) => this.setState({categoryId: categoryId})}>
        {categories.map((category) => (
          <PickerItemIOS
            key={category.id}
            value={category.id}
            label={category.name} />
          )
        )}
      </PickerIOS>
    )
  },

  selectCategory: function() {
    this.props.onPickCategory(this.state.categoryId)
  },

  render: function() {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>Please pick a category:</Text>
        {this.renderPicker()}
        <TouchableHighlight onPress={this.selectCategory}>
          <Text>Use this category</Text>
        </TouchableHighlight>
      </View>
    );
  },
});


var SelectGameMode = React.createClass ({
  pickCategories: function(categoryId) {
    this.props.navigator.push({
      component: ShowPictures,
      passProps: {extension: 'category_id=' + categoryId.toString()}
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
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Please Pick Your Game Mode:</Text>
     
      <CategoryPicker onPickCategory={this.pickCategories} />

       <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button}
                              onPress={this.playRandom}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button}
                              onPress={this.playChuckNorris}>
            <Text style={styles.buttonText}>Chuck Norris</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      );
    },
  });

module.exports = SelectGameMode;
