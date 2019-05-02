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
  Dimensions,
  BackHandler,
  AsyncStorage
} from 'react-native';
import {Constants, Variables} from '../constants'

export default class deleteProfileView extends React.Component {
    static navigationOptions = {
        title: 'Delete Profile?',
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
    *   An asynchronous function to be performed after the deleteProfileFunc() is
    *   called. Removes the users unique ID and authentication token and then
    *   navigates back to the login screen.
    */
    async clearData(){
        const {navigate} = this.props.navigation;
        try {
          await AsyncStorage.multiRemove(['authToken','userID']).then(()=>{
            return navigate('login', {cameFrom: 'deleteProfileView'});
          });
        } catch (error) {
            return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }
    }

    /*
    *   Post request is sent to the server. 
    *   Includes the user's unique ID and authentication token. If the 
    *   post request is successful, the user is navigated back to the login,
    *   clearData() is called and given positive feedback. If unsuccessful, 
    *   no critical changes are made.
    */
    deleteProfileFunc() {
        let URL = Constants.URL + '/profile/delete';
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
                    'Your account has been deleted.',
                    'All critical information has been disposed.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                this.clearData();
                            }
                        }
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
    *   deleteProfileFunc() is called. If unsuccessful, no chagnes are made
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
                        {text: 'DELETE PROFILE',
                        onPress: () => this.deleteProfileFunc()}
                    ]
                )
            } 
            else { //request failed
                Alert.alert(
                    'Profile deletion aborted.',
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
    *   Displays text intrustions for user delete their profile. Text input
    *   is provided for password inupt, and a button is rendered (only tappable
    *   if there is input in the text field). Once the button is pressed the user
    *   is prompted with a failsafe alert, if user bypasses then checkPassFunc()
    *   is called.
    */
    render() {
        return(
            <TouchableWithoutFeedback
            onPress = {Keyboard.dismiss} 
            accessible = {false}>
                <View style = {styles.viewStyle}>
                    <Text style = {styles.titleFont}> Enter your password, then press 'DELETE' to proceed.</Text>
                    <TextInput 
                    style = {styles.passInput}
                    clearTextOnFocus = {true}
                    placeholder = "Enter your password here..."
                    secureTextEntry = {true}
                    onChangeText = {(text) => this.setState({inputPass: text})}>
                    </TextInput>
                    <TouchableOpacity
                    style = {this.state.inputPass===''? styles.deleteButtonDisabled : styles.deleteButtonEnabled}
                    onPress = {() => Alert.alert(
                        'Are you sure you wish to delete your profile?',
                        'This action is irreversible!',
                        [
                            {text: 'CANCEL'},
                            {text: 'PROCEED',
                            onPress: () => this.checkPassFunc()}
                        ]
                    )}
                    >
                        <Text style = {this.state.inputPass==='' ? styles.deleteButtonTextDisabled : styles.deleteButtonTextEnabled}>
                            DELETE
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
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
        alignItems : 'center',
        marginTop: Constants.deviceHeight * 0.1,
        color:'green'
    },
    passInput: {
        fontSize: 20,
        marginTop: Constants.deviceHeight * 0.1,
        height: Constants.deviceHeight * 0.05,
        width: Constants.deviceWidth * 0.7,
        borderBottomColor:'#5CA61B',
        borderBottomWidth:2,
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
        textAlign: 'center',
        fontWeight: 'bold',
        color:'white'
    },
    deleteButtonTextDisabled: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color:'gray'
    }
});