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
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
  AsyncStorage,
  BackHandler
} from 'react-native';
import {
  Constants,
  Variables
} from '../constants.js';

export default class login extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      success: false,
      error_code: '',
      error_message: '',
    };
    
    // Disables hardware back button on android
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    });
  }

  // Disables back swipe on iOS
  static navigationOptions = {
    title: 'Daily Rind - Welcome!',
    headerTintColor:'white',
    headerRight: null,
    headerLeft: null,
    gesturesEnabled: false
  };

  /*
  * Check if username and password are empty
  * If passwords are empty then it will return True
  * otherwise it will return False
  */
  canRender() {
    if((this.state.username === '') || (this.state.password === '')) {
      return true;
    } else {
      return false;
    }
  }

  /*
  * does server call
  * logs the user in.
  * If the log in is successful
  * then it will store data in device
  * otherwise it will send alert
  */
  loginHandling() {
    const URL = Constants.URL + "/auth/login";
    let data = {
      method:'POST',
      body:JSON.stringify({
        username:this.state.username,
        password:this.state.password
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
          Variables.auth_token = responseJson.token,
          Variables.user_id = responseJson.user_id;
          this.storeData(responseJson.token,responseJson.user_id);
        } //end handling for a successful response
        else {
        //FAILURE:
          this.setState({
            error_code: responseJson.error_code,
            error_message: responseJson.error_msg,
          })//end setState
          return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }//end handling for a failed response
    }) //end fetch*/
  } //end loginHandling

  /*
  * storesData in the device
  * If it worked then it will navigate to calendar
  * otherwise it will raise an alert
  */
  async storeData(authToken, userID){
    const {navigate} = this.props.navigation;
    userID = ""+userID;
    try {
      await AsyncStorage.multiSet([['authToken', authToken],['userID',userID]]).then(()=>{
        return navigate('calendar', {cameFrom: 'login'});
      });
    } catch (error) {
      return Alert.alert(this.state.error_code + ': ' + this.state.error_message);
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior = 'position' style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style = {styles.container}
        >
          <View style={styles.container}>
            <Image 
              source={require('./SoLLogo.png')} 
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text> </Text> 
            <TextInput style = {styles.input}
              {...this.props}
              clearTextOnFocus = {true}
              editable = {true}
              maxLength = {40}
              autoCapitalize = "none"
              placeholder = "Enter your e-mail"
              returnKeyType='next'
              keyboardType='email-address'
              ref = {'txtFirst'}
              onChangeText={(username) => this.setState({username})}
              onSubmitEditing={()=>this.refs.txtLast.focus()}
            />
            <TextInput style = {styles.input}
              {...this.props}
              clearTextOnFocus = {true}
              editable = {true}
              maxLength = {40}
              autoCapitalize = "none"
              placeholder = "Enter your password"
              secureTextEntry = {true}
              ref = {'txtLast'}
              returnKeyType='next'
              onChangeText={(password) => this.setState({password})}
            />
            <Text> </Text>
            <Text style={styles.selections} onPress={() => navigate('registerView', {cameFrom: 'login'})}>Don't have an account?</Text>
            <Text> </Text>
            <Text style={styles.selections} onPress={() => navigate('askEmail', {cameFrom: 'login'})}>Forgot Password?</Text>
            <Text> </Text>
            <TouchableOpacity
              disabled = {this.canRender()}
              onPress = {()=>this.loginHandling()}
              style = { !this.canRender() ? styles.loginButtonEnabled : styles.loginButtonDisabled}
            >
              <Text
                style={ !this.canRender() ? styles.loginButtonTextEnabled : styles.loginButtonTextDisabled}
              >Login</Text>
            </TouchableOpacity>
            <Text> </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.deviceHeight * 0.04,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  selections: {
    color: '#c4c4c4',
    textDecorationLine: 'underline',
  },
  input: {
    height: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.7,
    borderBottomWidth: 2,
    borderBottomColor: '#5CA61B',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000',
    marginBottom: Constants.deviceHeight * 0.02,
  },
  loginButtonEnabled:{
    marginTop: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: '#5CA61B',
    borderRadius: 20
  },
  loginButtonDisabled:{
    marginTop: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    backgroundColor: '#CECECE',
    borderRadius: 20
  },
  loginButtonTextEnabled:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF'
  },
  loginButtonTextDisabled:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'gray'
  }
});
