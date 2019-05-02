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
  TouchableOpacity,
} from 'react-native';
import {
  Constants, 
  Variables
} from '../constants.js';
import { BackHandler } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
    headerTintColor:'white',
  }

  constructor(props) {
    super(props);
    /*
    *   question holds all potential questions in order
    *   order based on array
    */
    this.state = {
      answer: '',
      question: [
        'What was your childhood nickname?', //0
        "What was your dream job as a child?", //1
        "What was your favorite food as a child?", //2
        "Who was your childhood hero?", //3
        "Where does your nearest sibling live?", //4
      ],
    };

    // Disable hardware back button (required for android)
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    });
  }

  /*
  *   sQAHandling: does server call
  *   sends the security answer and the email
  *   if the response is correct then it will
  *   redirect to answerSecurityQuestion
  *   if it isn't then it will display an error
  */
  sQAHandling() {
    const {navigate} = this.props.navigation;
    const URL = Constants.URL + "/auth/forgot";
    const email = this.props.navigation.getParam('email', 'who knows');
    let data = {
      method:'POST',
      body:JSON.stringify({
        security_answer:this.state.answer,
        email: email
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
            return navigate('changePass', {cameFrom: 'answerSecurityQuestion'});
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
  }

  /*
  *   Renders the view
  */
  render() {
    const quest = this.props.navigation.getParam('security_question', 'error');
    return ( 
      <TouchableWithoutFeedback style = {styles.container} onPress = {Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle = 'light-content'/>
          <Text style = {styles.title}>Security Question</Text>
          <Text style = {styles.question}>{this.state.question[quest]}</Text>
          <TextInput style = {styles.input}
            editable = {true}
            placeholder = "Answer"
            placeholderTextColor = 'rgba(38, 38, 38, 0.8)'
            autoCapitalize = 'none'
            autoCorrect = {false}
            onChangeText={(answer) => this.setState({answer})}
          />
          <TouchableOpacity style = {styles.buttonContainer} onPress = {() => this.sQAHandling()}>
            <Text style = {styles.buttonText}>SUBMIT</Text>
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
    justifyContent: 'center',
  },
  title: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  question: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
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
  buttonContainer: {
    backgroundColor: '#5CA61B',
    marginTop: Constants.deviceHeight * 0.05,
    marginBottom: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.02,
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});