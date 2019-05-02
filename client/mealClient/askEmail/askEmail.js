/*
*   Author: Zach
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*   TODO: Change width to use deviceWidth and Height
*/
import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import {
  Constants,
  Variables
} from '../constants.js';
import { BackHandler } from 'react-native';


export default class askEmail extends React.Component {
  // disables hardware back navigation on iOS
  static navigationOptions = {
    title: 'Forgot Password?',
    headerTintColor: 'white',
    gesturesEnabled: false
  }

  constructor (props) {
    super(props);
    
    // Disables hardware back button (android)
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    });

    this.state = {
      email: '',
      success: false,
      error_code: '',
      error_message: '',
      security_question: '',
    };
  }
  
  /*
  *   Returns true if email has content otherwise return false
  *   Used to control button disabled
  */
  canRender() {
    if((this.state.email === '')) {
      return true;
    } else {
      return false;
    }
  }

  /*
  *   Sends request to server
  *   Sends email to server if email is valid returns userID and authToken
  *   If it is not valid then it will display an error
  */
  serverHandling() {
    const {navigate} = this.props.navigation;
    const URL = Constants.URL + "/auth/forgot/email";
    let data = {
      method:'POST',
      body:JSON.stringify({
        email: this.state.email,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }
    fetch(URL, data)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success === true) {
        //SUCCESS:
            this.setState({security_question: responseJson.security_question});
            //NAVIGATE TO answerSecurityQuestion WHILE PASSING INFO
            return navigate('answerSecurityQuestion', {
              cameFrom: 'askEmail',
              security_question: this.state.security_question,
              email: this.state.email,
            });
        } //end handling for a successful response
        else {
        //FAILURE:
          this.setState({
            error_code: responseJson.error_code,
            error_message: responseJson.error_msg,
          })//end setState
          return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }//end handling for a failed response
    }) //end fetch
  } //end loginHandling

  render() {   
    return (
      <View style={styles.container}>
        
        <Text style={styles.title1}>Enter your registered email address.</Text>
        <Text style = {styles.title2}>Then, answer your security question to reset your password.</Text>
        <TextInput style = {styles.input}
          {...this.props}
          clearTextOnFocus = {true}
          editable = {true}
          maxLength = {40}
          autoCapitalize = "none"
          placeholder = "Enter your e-mail"
          onChangeText={(email) => this.setState({email})}
        />
        <TouchableOpacity
          disabled = {this.canRender()}
          onPress = {()=> this.serverHandling()}
          style = {this.canRender() ? styles.buttonContainerDisabled : styles.buttonContainerEnabled}
        >
          <Text
            style = {this.canRender() ? styles.buttonTextDisabled : styles.buttonTextEnabled}
          >Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title1: {
    marginTop: Constants.deviceHeight * .15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'green'
  },
  title2: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'green'
  },
  selections: {
    color: '#c4c4c4',
    textDecorationLine: 'underline',
  },
  input: {
    height: 50,
    width: 300,
    borderBottomWidth: 2,
    borderBottomColor: '#5CA61B',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000',
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  buttonContainerEnabled:{
    marginTop: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: '#5CA61B',
    borderRadius: 20
  },
  buttonContainerDisabled:{
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: '#CECECE',
    borderRadius: 20
  },
  buttonTextEnabled:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF'
  },
  buttonTextDisabled:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'gray'
  }
});
