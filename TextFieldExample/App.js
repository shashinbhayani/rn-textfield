/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from './react-native-textfield';

export default class App extends Component {
  state = {
    loginUsername: ""
  }

  onChangeText = value => {
    this.setState({
      loginUsername: value,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextField
          ref="one"
          childRef="one"
          label={"First Name"}
          value={this.state.loginUsername}
          placeholderTextColor={"black"}
          activeLabelColor={"black"}
          borderBottomColor={"black"}
          onChangeText={this.onChangeText}
          returnKeyType="next"
        />
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
