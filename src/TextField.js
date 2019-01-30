import React, { Component } from "react";
import { View, Animated, TextInput} from "react-native";
const scale = 2;

/**
 * Input text with animated placeholder
 */
export default class TextField extends Component {

  static defaultProps = {
    keyboardType: "default"
  }


  state = {
    isFocused: false,
  };
  constructor(props) {
    super(props);
    this.textAnimation = new Animated.Value(0);
    this.inputs = {};
  }

  /**
   * Animates placeholder
   * @param {} None
   * @returns {} None
   */
  animationFocus() {
    this.setState({ isFocused: true });
    Animated.timing(this.textAnimation, {
      toValue: 1,
      duration: 250
    }).start();
  }

  /**
   * Animates placeholder
   * @param {} None
   * @returns {} None
   */
  animationBlur() {
    this.setState({ isFocused: false });
    if (this.props.value == "")
      Animated.timing(this.textAnimation, {
        toValue: 0,
        duration: 250
      }).start();
  }

  render() {
    const lableFontSize = styles.textInputStyle.fontSize;
    const { isFocused } = this.state;
    const textSize = this.textAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [lableFontSize, lableFontSize * 0.8, lableFontSize * 0.7]
    });
    const textPosition = this.textAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [lableFontSize, 0]
    });
    const labelStyle = {
      position: "absolute",
      left: 3,
      top: textPosition,
      fontSize: textSize,
      color: isFocused ? this.props.placeholderTextColor : this.props.placeholderTextColor
    };
    return (
      <View>
        <Animated.Text style={labelStyle}>{this.props.label}</Animated.Text>
        <TextInput
          ref={this.props.childRef}
          value={this.props.value}
          autoCorrect={true}
          secureTextEntry={this.props.password}
          placeholderTextColor={this.props.placeholderTextColor}
          keyboardType={this.props.keyboardType}
          style={[
            styles.textInputStyle,
            {
              color: this.props.activeLabelColor,
              borderBottomColor: this.props.borderBottomColor
            }
          ]}
          onFocus={this.animationFocus.bind(this)}
          onBlur={this.animationBlur.bind(this)}
          onChange={this.props.onChange}
          returnKeyType={this.props.returnKeyType}
          onChangeText={input => {
            this.setState({ input });
            this.props.onChangeText(input);
          }}
          onSubmitEditing={this.props.onSubmitEditing}
        />
      </View>
    );
  }
}

const styles = {
  textInputStyle: {
    fontSize: 15,
    borderBottomWidth: 3 / scale,
    paddingBottom: 4
  }
};