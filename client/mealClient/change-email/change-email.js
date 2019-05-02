/*
*   Author: Katie
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {
  Constants, 
  Variables
} from '../constants.js';

export default class ChangeEmail extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      email1: '',
      email2: '',
      isLoading: true,
    };
  }

  /*
  *  Enable Back Navigation
  */
  static navigationOptions = {
    headerTintColor:'white',
    gesturesEnabled:true
  }

  /*
  * Checks if email and confirm email match.
  * If it does then it does call to server
  * Otherwise it creates an Alert
  */
  checkEmails = () => {
    if((this.state.email1 !== '') && (this.state.email1 === this.state.email2)){
      this.componentPostServer();
    }else{
      return Alert.alert("Try Again. Emails do not match");
    }
  };
  
  /*
  * Does request to Server.
  * Sends email, token, and user id
  * If successfull then it will show an success alert
  * If not then display error 
  */
  componentPostServer(){
    const myURL = Constants.URL + '/profile/update/email';
    let data ={
      method:'POST',
      body:JSON.stringify({
        email:this.state.email1,
        token: Variables.auth_token,
        user_id: Variables.user_id,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }
    fetch(myURL, data)
    .then((response)=> response.json())
    .then((d)=>{
      if(d.success==true){
        this.setState({email1:'',email2:''});
        return Alert.alert("Email Successfully Changed");
      }else{
        return Alert.alert("Server Error");
      }
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible = {false}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Email</Text>
          <TextInput
            style={styles.textInput1}
            clearTextOnFocus={true}
            editable={true}
            autoCapitalize = 'none'
            placeholder="Enter new Email"
            onChangeText={(email1) => this.setState({email1})}
            ref = {'txtFirst'}
            returnKeyType='next'
            onSubmitEditing={()=>this.refs.txtLast.focus()}
          />
          <TextInput
            style={styles.textInput1}
            clearTextOnFocus={true}
            editable={true}
            autoCapitalize = 'none'
            placeholder="Confirm new Email"
            onChangeText={(email2) => this.setState({email2})}
            ref = {'txtLast'}
            returnKeyType='next'
          />

          <TouchableOpacity
            style={this.state.email1 === '' || this.state.email2===''?styles.changeButtonContainerDisabled: styles.changeButtonContainerEnabled}
            onPress={this.checkEmails}
            disabled = {this.state.email1 === '' || this.state.email2===''?true:false}
            >
            <Text style={this.state.email1 === '' || this.state.email2===''?styles.buttonTextDisabled : styles.buttonTextEnabled}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Constants.deviceHeight * 0.1
  },
  title:{
    fontSize: 30, 
    color: 'green',
    marginBottom: Constants.deviceHeight * 0.05
  },
  changeButtonContainerDisabled: {
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: "#CECECE",
    borderRadius: 20
  },
  changeButtonContainerEnabled: {
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: "#5CA61B",
    borderRadius: 20
  },
  textInput1:{
    width: Constants.deviceWidth * 0.7,
    height: Constants.deviceHeight * .05,
    borderBottomWidth:2,
    borderColor:'#5CA61B',
    marginBottom: Constants.deviceHeight * 0.05
  },
  buttonTextDisabled:{
    textAlign: 'center',
    alignSelf: 'center',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonTextEnabled:{
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
