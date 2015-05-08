var React = require('react-native');

var {
  View,
  Text,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
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
    return {}
  },

  componentWillMount: function() {
    //console.log('mounting')
    fetch(`http://4aa88bb3.ngrok.com/play/show?${this.props.extension}.json`)
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

    fetch(`https://77faee71.ngrok.com/play/show/${this.props.extension}/${itemOne}/${itemTwo}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ })
    });

    fetch(`https://77faee71.ngrok.com/play/show?${this.props.extension}.json`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({itemOne: responseData.item_1,
                       itemTwo: responseData.item_2})
    });
  },


  createComparisonTwo: function() {
    var itemOne = this.state.itemOne.id
    var itemTwo = this.state.itemTwo.id

    fetch(`https://77faee71.ngrok.com/play/show/${this.props.extension}/${itemTwo}/${itemOne}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ })
    });

    fetch(`https://77faee71.ngrok.com/play/show?${this.props.extension}.json`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({itemOne: responseData.item_1,
                       itemTwo: responseData.item_2})
    });
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

