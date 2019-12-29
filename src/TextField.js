import React, { Component, createRef } from "react";
import { View, Animated, TextInput, StyleSheet } from "react-native";

/**
 * Input text with animated placeholder
 */
export default class TextField extends Component {

  fieldRef = createRef()

  static defaultProps = {
    keyboardType: "default",
    tintColor: "#222222",
    activeTintColor: "#0091EA",
    fontSize: 15,
    placeholder: "",
    onBlur: () => {},
    onFocus: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
  }

  state = {
    input: this.props.value,
    isFocused: false,
    height: undefined,
    labelPaddingLeft: undefined
  };

  constructor(props) {
    super(props);
    this.textAnimation = new Animated.Value(this.props.value ? 1 : 0);
    this.inputs = {};
  }

  animationFocus = () => {
    this.setState({ isFocused: true });
    Animated.timing(this.textAnimation, {
      toValue: 1,
      duration: 250
    }).start();
  }

  animationBlur = () => {
    this.setState({ isFocused: false });
    if (this.state.input == "")
      Animated.timing(this.textAnimation, {
        toValue: 0,
        duration: 250
      }).start();
  }

  value = () => this.state.input

  onFocus = () => {
    this.animationFocus()
    this.props.onFocus()
  }

  onBlur = () => {
    this.animationBlur()
    this.props.onBlur()
  }

  onChangeText = input => {
    this.setState({ input });
    this.props.onChangeText(input);
  }

  onSubmitEditing = () => {
    this.props.onSubmitEditing()
  }

  onLeftAccLayout = e => {
    if (this.state.paddingLeft == undefined) {
      this.setState({
        labelPaddingLeft: e.nativeEvent.layout.width
      })
    }
  }

  _renderLeftAccessory = () => {
    if(typeof this.props.renderLeftAccessory === "function") {
      return this.props.renderLeftAccessory()
    }
    return null
  }
  _renderRightAccessory = () => {
    if(typeof this.props.renderRightAccessory === "function") {
      return this.props.renderRightAccessory()
    }
    return null
  }

  render() {
    const lableFontSize = this.props.fontSize;
    const { isFocused } = this.state;
    const textSize = this.textAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [lableFontSize, lableFontSize * 0.8, lableFontSize * 0.7]
    });
    const textPosition = this.textAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [lableFontSize - 4, -4]
    });
    const left = this.textAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.labelPaddingLeft || 0, 0]
    });

    const color = isFocused ? this.props.activeTintColor : this.props.tintColor

    const labelStyle = {
      position: "absolute",
      left: left,
      top: textPosition,
      fontSize: textSize,
      color: color,
      fontFamily: this.props.fontFamily
    };

    const inputStyle = {
      padding: 0,
      minHeight: this.props.fontSize + 10,
      fontSize: this.props.fontSize,
      color: color,
      lineHeight: this.props.fontSize + 5,
      textAlignVertical: "center",
      flex: 1,
      fontFamily: this.props.fontFamily
    }
    
    return (
      <View style={{ height: 50, justifyContent: "center" }}>
        
        {this.props.label ? <Animated.Text style={labelStyle}>{this.props.label}</Animated.Text> : null}
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View onLayout={this.onLeftAccLayout}>
            {this._renderLeftAccessory()}
          </View>
          <TextInput
            ref={ref => this.fieldRef = ref}
            value={this.state.input}
            placeholder={!this.props.label ? this.props.placeholder : ''}
            placeholderTextColor={this.props.tintColor}
            autoCorrect={true}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            style={inputStyle}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            returnKeyType={this.props.returnKeyType}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
            editable={!this.props.disabled}
          />
          <View>
            {this._renderRightAccessory()}
          </View>
        </View>
        <View style={{borderBottomColor: color, borderBottomWidth: 0.5,}} />
      </View>
    );
  }
}