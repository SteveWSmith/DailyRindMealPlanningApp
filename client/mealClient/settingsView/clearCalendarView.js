/*
*   Author: Steve W. Smith Jr.
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*/
import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {Constants, Variables} from '../constants'

export default class clearCalendarView extends React.Component {
    static navigationOptions = {
        title: 'Clear Calendar?',
        headerTintColor:'white',
        gesturesEnabled:true
    };
    
    constructor(props){
        super(props);
        //initial state to hold the inputPass paramerter used for post request
        this.state = {
            inputPass: ''
        };
    }

    /*
    *   Post request is sent to the server. 
    *   Includes the user's unique ID and authentication token. If the 
    *   post request is successful, the user is given positive feedback
    *   confirming the calendar was cleard and is then navigated back
    *   to the settings menu. If unsuccessful, no critical changes are made.
    */
    clearCalendarFunc() {
        let URL = Constants.URL + '/profile/delete/calendar';
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
                Alert.alert(
                    'Your calendar has been cleared.',
                    'All meals have been reset.',
                    [
                        {text: 'OK',
                        onPress: () => this.props.navigation.navigate('settingsView', {cameFrom: 'deleteProfileView'})}
                    ]
                )
            } 
            else { //request failed
                Alert.alert(
                    'Profile deletion aborted.',
                    'There may be server issues.',
                    [
                        {text: 'OK'}
                    ]
                )
            }
        }) 
    }

    /*
    *   Post request is sent to the server. 
    *   Includes the user's unique ID, authentication token, and inputted
    *   password. If the post request returns successful, the user is given
    *   the opportunity to abort or continue. If the user decides to continue,
    *   clearCalendarFunc() is called. If unsuccessful, no changes are made
    *   and user is given negative feedback.
    */
    checkPassFunc() { 
        let URL = Constants.URL + '/profile/password/check';
        let data = {
            method: 'POST',
            body: JSON.stringify({
                password: this.state.inputPass,
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
                Alert.alert(
                    'Your password has been verified.',
                    'Are you sure you wish to proceed?',
                    [
                        {text: 'CANCEL'},
                        {text: 'CLEAR CALENDAR',
                        onPress: () => this.clearCalendarFunc()}
                    ]
                )
            }
            else { //request failed
                Alert.alert(
                    'Calendar reset aborted.',
                    'Password was not verified.',
                    [
                        {text: 'OK'}
                    ]
                )
            }
        }) 
    }

    /*
    *   Render UI components.
    *   Displays text intrustions for user clear all meals from their calendar. 
    *   Text input is provided for password inupt and a button is rendered 
    *   (only tappable if there is input in the text field). Once the button 
    *   is pressed, the user is prompted with a failsafe alert, if user 
    *   bypasses then checkPassFunc() is called.
    */
    render() {
        return(
            <KeyboardAvoidingView behavior = 'position' style={styles.viewStyle}>
                <TouchableWithoutFeedback
                onPress = {Keyboard.dismiss} 
                accessible = {false}>
                    <View style = {styles.viewStyle}>
                        <Text style = {styles.titleFont}> Enter your password, then press 'CLEAR CALENDAR' to proceed.</Text>
                        <TextInput 
                            style = {styles.passInput}
                            clearTextOnFocus = {true}
                            placeholder = "Enter your password here..."
                            secureTextEntry = {true}
                            onChangeText = {(text) => this.setState({inputPass: text})}>
                        </TextInput>
                        <TouchableOpacity
                            style = {this.state.inputPass=== '' ? styles.deleteButtonDisabled : styles.deleteButtonEnabled}
                            onPress = {() => Alert.alert(
                                'Are you sure you wish to clear your calendar?',
                                'This action is irreversible!',
                            [
                                {text: 'CANCEL'},
                                {text: 'PROCEED',
                                onPress: () => this.checkPassFunc()}
                            ]
                        )}
                        >
                            <Text style = {this.state.inputPass=== '' ? styles.deleteButtonTextDisabled : styles.deleteButtonTextEnabled}>
                                CLEAR CALENDAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

/*
*   'styles' constant contains styling for all UI components
*/
const styles = StyleSheet.create({
    viewStyle: {
        alignItems: 'center'
    },
    titleFont: {
        fontSize: 30,
        textAlign: 'center',
        color:'black',
        alignItems: 'center',
        marginTop: Constants.deviceHeight * 0.1,
        color:'green'
    },
    passInput: {
        marginTop: Constants.deviceHeight * .1,
        height: Constants.deviceHeight * .05,
        width: Constants.deviceWidth * .7,
        borderBottomColor:'#5CA61B',
        borderBottomWidth:2,
        fontSize: 20
    },
    deleteButtonEnabled: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.deviceHeight * 0.1,
        width: Constants.deviceWidth * 0.6,
        height: Constants.deviceHeight * 0.1,
        backgroundColor: 'red',
        borderRadius: 20
    },
    deleteButtonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.deviceHeight * 0.1,
        width: Constants.deviceWidth * 0.6,
        height: Constants.deviceHeight * 0.1,
        backgroundColor: '#CECECE',
        borderRadius: 20
    },
    deleteButtonTextEnabled: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    deleteButtonTextDisabled:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray'
    }
});