/*
*   Author: Caitlyn
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*   TODO: Change width to use deviceWidth and Height
*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Constants} from '../constants.js'

export default class App extends React.Component {
  
  // enables swipe back for iOS
  static navigationOptions = {
    headerTintColor:'white',
    gesturesEnabled:true
  }
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: ''
    };
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior = 'padding' style = {styles.container}>  
        <TouchableWithoutFeedback style = {styles.container} onPress = {Keyboard.dismiss}>
          <View style={styles.container}>
            <StatusBar 
              backgroundColor = '#5CA61B'
              barStyle = 'light-content'
            />
            <Text style = {styles.title}>Registration</Text>
            <TextInput style = {styles.input}
              editable = {true}
              placeholder = "First Name"
              placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
              autoCapitalize = 'none'
              autoCorrect = {false}
              returnKeyType = 'next'
              ref = {'txtFirst'}
              onChangeText={(firstName) => this.setState({firstName})}
              onSubmitEditing = {() => this.refs.txtLast.focus()}
            />
            <TextInput style = {styles.input}
              editable = {true}
              placeholder = "Last Name"
              placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
              autoCapitalize = 'none'
              autoCorrect = {false}
              returnKeyType = 'next'
              ref = {'txtLast'}
              onChangeText={(lastName) => this.setState({lastName})}
              onSubmitEditing = {() => this.refs.txtEmail.focus()}
            />
            <TextInput style = {styles.input}
              editable = {true}
              placeholder = "Email"
              placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
              keyboardType = 'email-address'
              autoCapitalize = 'none'
              autoCorrect = {false}
              returnKeyType = 'next'
              ref = {'txtEmail'}
              onChangeText={(email) => this.setState({email})}
              onSubmitEditing = {() => this.refs.txtPassword.focus()}
            />
            <TextInput style = {styles.input}
              editable = {true}
              placeholder = "Password"
              placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
              autoCapitalize = 'none'
              autoCorrect = {false}
              returnKeyType = 'next'
              secureTextEntry = {true}
              ref = {"txtPassword"}
              onChangeText={(password) => this.setState({password})}
              onSubmitEditing = {() => this.refs.comfPassword.focus()}
            />
            <TextInput style = {styles.input}
              editable = {true}
              placeholder = "Confirm Password"
              placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
              autoCapitalize = 'none'
              autoCorrect = {false}
              returnKeyType = 'next'
              secureTextEntry = {true}
              ref = {"comfPassword"}
              onChangeText={(password2) => this.setState({password2})}
            />
            <TouchableOpacity
              style = {
                this.state.firstName === '' || 
                this.state.lastName === '' || 
                this.state.email === '' || 
                this.state.password === '' || 
                this.state.password2 === '' ? styles.buttonContainerDisabled : styles.buttonContainerEnabled
              }
              disabled = {this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '' || this.state.password2 === ''}
              onPress = {() => {
                if((this.state.password !== '') && (this.state.password === this.state.password2)){
                  navigate('securityQuestion', {cameFrom: 'registerView', 
                  first_name: this.state.firstName, last_name: this.state.lastName,
                  password: this.state.password, email: this.state.email})
                }else{
                  return Alert.alert("Your Passwords Do Not Match, Please Try Again");
                }
              }}>
              <Text 
                style = {
                  this.state.firstName === '' || 
                  this.state.lastName === '' || 
                  this.state.email === '' || 
                  this.state.password === '' || 
                  this.state.password2 === '' ? styles.buttonTextDisabled : styles.buttonTextEnabled
                }
                >NEXT</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'green'
  },
  input: {
    height: 50,
    width: 300,
    borderBottomWidth: 2,
    borderBottomColor: '#5CA61B',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  buttonContainerEnabled: {
    backgroundColor: '#5CA61B',
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    borderRadius: 20
  },
  buttonContainerDisabled: {
    backgroundColor: '#CECECE',
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    borderRadius: 20
  },
  buttonTextEnabled: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonTextDisabled: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold'
  },
});
