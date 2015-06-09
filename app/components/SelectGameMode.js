var React = require('react-native');

console.log('Loading SelectGameMode');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  PickerIOS,
  ScrollView,
  Image,
  Navigator,
} = React;

var ShowPictures = require('./ShowPictures');
var chuckNorrisPick = 'http://www.shiftgig.com/sites/default/files/article-images/13029_1411144363_1273945.png';
var ngrokurl = require('../ngrok');

var styles = React.StyleSheet.create({
  text: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
  },

  headerText: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: -10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  pickerView: {
    textAlign: 'center',
    marginBottom: -10,
    marginTop: -5,
    backgroundColor: 'red'
  },

  container: {
    padding: 0,
    marginTop: 30
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },

  button: {
    marginLeft: 5,
    flex: 0,
    backgroundColor: '#48BBEC',
    width: 200,
  },

  useThisButton: {
    flex: 0,
    backgroundColor: 'red',
    alignItems: 'flex-start',
  },

  buttonText: {
    padding: 20,
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  backdropView: {
    marginBottom: -10,
    marginTop: -5,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  backgroundImage: {
    flex: 1,
    width: 800,
    height: 400,
    top: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.2
  },
});

var PickerItemIOS = PickerIOS.Item;

var CategoryPicker = React.createClass({
  componentWillMount: function() {
    fetch(`${ngrokurl}/api/v1/play/categories.json`)
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
    <View>
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
    </View>
    )
  },

  selectCategory: function() {
    this.props.onPickCategory(this.state.categoryId)
  },

  render: function() {
    return (
      <View>
          <Image style={styles.backgroundImage} 
                  source={{uri: chuckNorrisPick}}
                  backgroundImage={Image.resizeMode.cover} />
          <View style={styles.backdropView}>
              <Text style={styles.headerText}>Select Game Mode:</Text>
              {this.renderPicker()}
              <View style={styles.buttonContainer}>
                  <TouchableHighlight onPress={this.selectCategory} 
                                      style={styles.useThisButton}>
                      <Text style={styles.buttonText}>Use Selected Category</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button}
                                      onPress={this.props.onPlayRandom}>
                      <Text style={styles.buttonText}>Play Random</Text>
                  </TouchableHighlight>
               </View>
            </View>
        </View>
    );
  },
});


var SelectGameMode = React.createClass({
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
      <View style={styles.container}>
        <CategoryPicker onPickCategory={this.pickCategories} 
                        onPlayRandom={this.playRandom} 
                        onChuckNorris={this.playChuckNorris} />  
      </View>
    );
  },
});

module.exports = SelectGameMode;
