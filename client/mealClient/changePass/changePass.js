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
  TextInput,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  Constants, 
  Variables
} from '../constants.js';

export default class changePass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        pass1 : '',
        pass2 : '',
        error_code: '',
        error_message: '',
    };
    
    /* 
    * If came from answerSecurityQuestion
    * Disables hardware back button on android and swipe navigation on iOS
    */
    if(this.props.navigation.getParam('cameFrom')==='answerSecurityQuestion'){
      this.props.navigation.setParams({isHeaderShow: null,navigationEnabled:false});
      BackHandler.addEventListener('hardwareBackPress',function(){
        return true;
      });
    }else{
      this.props.navigation.setParams({isHeaderShow: undefined,navigationEnabled:true});
    }
  }

  /*
  * Enables navigation if came from answerSecurityQuestion
  */
  static navigationOptions = ({navigation})=>{
    return{
      headerTintColor:'white',
      gesturesEnabled : navigation.state.params.navigationEnabled,
      headerLeft: navigation.state.params.isHeaderShow
    }
  }

  /*
  * Does server call
  * if came from answerSecurityQuestion it will log you out
  * if came from securitySubView it will navigate to calendar
  * otherwise then success is false and error message will be displayed
  */
  updatePassword() {
    const cameFrom = this.props.navigation.getParam('cameFrom', 'who knows');
    const {navigate} = this.props.navigation;
    var URL = Constants.URL + "/profile/update/password";
    let data = {
      method:'POST',
      body:JSON.stringify({
        password: this.state.pass1,
        token: Variables.auth_token,
        user_id: Variables.user_id,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }
    fetch(URL, data)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success === true) {
          if (cameFrom === 'answerSecurityQuestion') {
            this.logoutFunc();
            Alert.alert("Password change successful!");
            return navigate('login', {cameFrom: 'changePass'});
          } else if (cameFrom === 'securitySubView') {
            Alert.alert("Password change successful!");
            return navigate('settingsView', {cameFrom: 'changePass'});
          } else {
            return Alert.alert("Something went wrong, don't know where to go. cameFrom is: " + cameFrom);
          }

        } //end handling for a successful response
        else {
        //FAILURE:
          this.setState({
            error_code: responseJson.error_code,
            error_message: responseJson.error_message,
          })//end setState
          return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }//end handling for a failed response
    }) //end fetch
  } //end passwordUpdate

  /*
  * Logouts user
  */
  logoutFunc() {
    const URL = Constants.URL + '/logout';
    let data = {
      method: 'POST',
      body: JSON.stringify({
          token: Variables.auth_token,
          user_id: Variables.user_id,
      }),
      header: {
          'Content-Type':'application/json'
      }
    }
    fetch(URL, data)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success === true){ //request succeeded
        null;
      } //end success handling
    }) //end response handling
  } //end logoutFunc

  /*
  * checks if passwords match
  * if it does then it will return true else false
  */
  renderable() {
    if((this.state.pass1 !== '') && (this.state.pass1 === this.state.pass2)) {
      return false;
    } else {
      return true;
    }
  }

  /*
  * pick texts to display depending on if passwords match
  */
  confirmationText() {
    if((this.state.pass1 != '') && (this.state.pass1 === this.state.pass2)) {
      return <Text style={styles.greenText}>Passwords are a match!</Text> ;
    } else if((this.state.pass1 === '') || (this.state.pass2) === '') {
      return <Text style={styles.redText}>Please enter your new password.</Text>;
    } else {
      return <Text style={styles.redText}>Passwords do not match.</Text>
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.mainText}>Change Password</Text>
          <Text> </Text>
          <Text> </Text>
          <TextInput style = {styles.input}
            {...this.props}
            clearTextOnFocus = {true}
            editable = {true}
            maxLength = {40}
            autoCapitalize = "none"
            placeholder = "Enter your new password"
            secureTextEntry = {true}
            onChangeText={(pass1) => this.setState({pass1})}
            ref = {'txtFirst'}
            returnKeyType='next'
            onSubmitEditing={()=>this.refs.txtLast.focus()}
          />
          <Text> </Text>
          <Text> </Text>
          <TextInput style = {styles.input}
            {...this.props}
            clearTextOnFocus = {true}
            editable = {true}
            maxLength = {40}
            autoCapitalize = "none"
            placeholder = "Confirm new password"
            secureTextEntry = {true}
            onChangeText={(pass2) => this.setState({pass2})}
            ref = {'txtLast'}
            returnKeyType='next'
          />
          <Text> </Text>
          <Text> </Text>
          <TouchableOpacity
            disabled = {this.renderable()}
            style={this.renderable()?styles.buttonContainerDisabled : styles.buttonContainerEnabled}
            onPress={()=>this.updatePassword()}
          >
            <Text
              style={this.renderable()?styles.buttonTextDisabled : styles.buttonTextEnabled}
            >
              Update
            </Text>
          </TouchableOpacity>
          <Text> </Text>
          <Text>{this.confirmationText()}</Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  mainText: {
    marginTop: 30,
    fontSize: 30,
    color:'green'
  },

  greenText: {
    color: '#00ff00'
  },

  redText: {
    color: '#ff0000'
  },
  
  input: {
    width: Constants.deviceWidth * 0.7,
    height: Constants.deviceHeight * .05,
    borderBottomWidth: 2,
    borderBottomColor: '#5CA61B',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  buttonContainerDisabled:{
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: "#CECECE",
    borderRadius: 20
  },
  buttonContainerEnabled:{
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: "#5CA61B",
    borderRadius: 20
  },
  buttonTextDisabled:{
    textAlign: 'center',
    alignSelf: 'center',
    color: 'gray',
    fontSize: 20,
  },
  buttonTextEnabled:{
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
  }
});
