var React = require('react-native');

var {
  View,
  Text,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  AsyncStorage
} = React;


var PictureOption = React.createClass ({
  _onPress: function() {
    this.props.onPress(this.props.item);
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <Image style={styles.image}
           source={{uri: this.props.item.picture}} />
      </TouchableHighlight>
     )
  }
});


var ShowPictures = React.createClass ({
  getInitialState: function() {
    AsyncStorage.getItem('API_KEY')
      .then((apikey) => {
        this.setState({userKey: apikey})
    })
    return {}
  },

  componentWillMount: function() {
    //console.log('mounting')
    fetch(`http://4779340a.ngrok.com/api/v1/play/show?${this.props.extension}.json`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({itemOne: responseData.item_1,
                       itemTwo: responseData.item_2})
      });
  },


  createComparisonOne: function() {
    var itemOne = this.state.itemOne.id
    var itemTwo = this.state.itemTwo.id
    //var otherItem = selectedItem.id == itemOne.id ? itemTwo : itemOne;
    if ((this.state.itemOne.category_id != 8) && (this.state.itemTwo.category_id == 8)) {
      AlertIOS.alert(
            'I thought you knew...',
            'Chuck Norris Always Wins...Please Try Again',
            [
              {text: 'Try Again', onPress: () => console.log('Pressed')},
            ]
          )
    } else {
      fetch(`http://4779340a.ngrok.com/api/v1/play/show/${this.props.extension}/${itemOne}/${itemTwo}/${this.state.userKey}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ })
      });

      fetch(`http://4779340a.ngrok.com/api/v1/play/show?${this.props.extension}.json`)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({itemOne: responseData.item_1,
                         itemTwo: responseData.item_2})
      });
    }
  },


  createComparisonTwo: function() {
    var itemOne = this.state.itemOne.id
    var itemTwo = this.state.itemTwo.id

    if ((this.state.itemTwo.category_id != 8) && (this.state.itemOne.category_id == 8)) {
      AlertIOS.alert(
            'I thought you knew...',
            'Chuck Norris Always Wins...Please Try Again',
            [
              {text: 'Try Again', onPress: () => console.log('Pressed')},
            ]
          )
    } else {
      fetch(`http://4779340a.ngrok.com/api/v1/play/show/${this.props.extension}/${itemTwo}/${itemOne}/${this.state.userKey}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ })
    });
    fetch(`http://4779340a.ngrok.com/api/v1/play/show?${this.props.extension}.json`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({itemOne: responseData.item_1,
                       itemTwo: responseData.item_2})
    });
    }
  },



  renderImages: function() {
    if (this.state.itemOne && this.state.itemTwo) {
      return (
        <View style={styles.imageContainer}>
          <PictureOption item={this.state.itemOne} onPress={this.createComparisonOne} />
          <PictureOption item={this.state.itemTwo} onPress={this.createComparisonTwo} />
        </View>
      )
    } else {
      return <View />
    }
  },

  render: function() {
    return (
      <View style={styles.wrapper}>
          {this.renderImages()}
      </View>
      );
  },
});


var styles = React.StyleSheet.create ({
  wrapper: {
    flex: 1,
    alignItems: 'center'
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 20
  },

  image: {
    height: 300,
    width: 300
  }
});


module.exports = ShowPictures;

