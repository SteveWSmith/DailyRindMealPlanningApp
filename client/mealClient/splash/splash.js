/*
*   Author: Zach, Alberto
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*/

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  Constants, 
  Variables
} from '../constants.js';
import { BackHandler, AsyncStorage } from 'react-native';

export default class changePass extends React.Component {

  //The EventListener disables the hardware's back button so that it can't be pressed.
  //This breaks the navigation in some cases, so we've removed its functionality.
  constructor(props){
    super(props);
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    });
  }

  /*
  * The purpose of the splash screen is to mask a quick check to see if the user is logged in.
  * The server call is executed so quickly that, without some artificially added wait time, the
  * splash screen doesn't have time to display and it doesn't look smooth.
  */
  async artificialWait(){
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  /*
  * retrieveData is the main functionality of the splash screen. Checks to see if the user is
  * already logged in on this device, and reacts accordingly. If they are, make sure Variables.js
  * is accurate and navigate them to calendar. Otherwise, navigate them to the login page.
  */
  async retrieveData() {
    try {
      AsyncStorage.multiGet(['authToken','userID']).then((value)=>{
        if (value[0][1] === null) {
          this.driverFunc('login','splash');
        }else{
          let userID = value[1][1];
          let authToken = value[0][1];
          const URL = Constants.URL + "/auth/check";
          let data = {
            method:'POST',
            body:JSON.stringify({
              token: authToken,
              user_id: userID
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
                Variables.auth_token = authToken,
                Variables.user_id = userID;
                this.driverFunc('calendar','splash');
            } //end handling for a successful response
            else {
            //FAILURE:
              this.driverFunc('login','splash');
            }//end handling for a failed response
          }); //end fetch
        }
      });
    } catch (error) {
      console.log("ERR: Splash Screen.");
    }
  };

  /*
  * driverFunc handles navigation, but also adds the artificial wait beforehand to give the
  * splash screen a chance to display for the user.
  */
  async driverFunc(to,from){
    const {navigate} = this.props.navigation;
    const d = await this.artificialWait();

    if (d !== null) {
      return navigate(to, {cameFrom: from});
    }
  }

  //Upon loading up the screen, run the check to see if the user is logged in.
  async componentDidMount() {
    this.retrieveData();
  }
  
  //Options regarding the header of the splash screen. Disabled in this instance.
  static navigationOptions = {
    headerTintColor: 'white',
    header: null
  };

  //Renders the components of the splash screen, including logo and background color
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image 
          source={require('../login/SoLLogo.png')} 
          style={{
            width: 200,
            height: 200,
            marginTop: Constants.deviceHeight * .3,
          }}
        />
      </View>
    );
  }
}

//Styles that modify the background color and margins.
const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
    backgroundColor: '#caf1a7',
    alignItems: 'center',
  },
});
