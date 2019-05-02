/*
*   Author: Steve W. Smith Jr.
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { 
    CheckBox 
} from 'react-native-elements'
import {Constants, Variables} from '../constants'
import {BackHandler} from 'react-native';

export default class allergyRegistrationView extends React.Component {
    static navigationOptions = {
        title: 'Allergy Registration',
        headerTintColor:'white'
    };

    constructor(props){
        super(props);

        /*
        * BackHandler disables the android native back button
        */
        BackHandler.addEventListener('hardwareBackPress',function(){
            return true;
        });

        /*  
        *   Set initial state of checkbox list to all false values
        *   'items' is an array of objects containing allergy names
        *   as well as a boolean value to hold whether they have been checked
        */  
        this.state = {
            items: [
                {
                    checked: false,
                    name: 'Dairy (Lactose)',
                },
                {
                    checked: false,
                    name: 'Eggs',
                },
                {
                    checked: false,
                    name: 'Treenuts',
                },
                {
                    checked: false,
                    name: 'Peanuts',
                },
                {
                    checked: false,
                    name: 'Shellfish',
                },
                {
                    checked: false,
                    name: 'Wheat (Gluten)',
                },
                {
                    checked: false,
                    name: 'Soy',
                },
                {
                    checked: false,
                    name: 'Fish',
                }
            ]
        }
    }

    /*
    *   toggleItem function flips the boolean value of 
    *   an individual object in the 'item' array
    */
    toggleItem = name => () => this.setState(state => ({
        items: state.items.map(item => {
            if (item.name === name) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item;
        })
    }))

    /*
    *   submitAllergiesRegistration is an anonymous function that initializes
    *   an initial array of 8 integers (all 0) to be modified based on 
    *   what allergies a user has selected that will then be sent to the
    *   server. 0 correlates to false/unchecked. 1 correlates to true/checked.
    * 
    *   Post request is sent to the server.
    *   Includes user's authentication token, their id, and
    *   the modified array containing the selected allergies.
    * 
    *   If post request was successful displays feedback and automatically
    *   navigates to the home screen.
    *   If unsuccessful, warning message is displayed and user is able to 
    *   try again.
    */
    submitAllergiesRegistration = () => { 
        let allergiesToSend = [0,0,0,0,0,0,0,0];
        for(let i = 0 ; i < this.state.items.length ; i++) {
            allergiesToSend[i] = this.state.items[i].checked === true ? 1 : 0;
        }
        const URL = Constants.URL + '/allergies/add';
        let data = {
            method:'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id,
                allergies: allergiesToSend,
            }),
            header:{
                'Content-Type':'application/json'
            }  
        }
        fetch(URL, data)
        .then((response) => response.json())
        .then((responseJson) => {
            
            if(responseJson.success === true) {
                Alert.alert(
                    'Allergies Updated',
                    'You are now finished registering.',
                    [
                        {
                            text: 'OK',
                            onPress: () => this.props.navigation.navigate('calendar', {cameFrom: 'allergyRegistrationView'})
                        }
                    ]
                ) 
            }
            else {
                Alert.alert(
                    'Allergy update failed.',
                    'There may be server issues, please try again.'
                    [
                        {
                            text: 'OK',
                        }
                    ]
                )
            }
        });
    }

    /*
    *   Render UI components.
    *   Displays text intrustions for user to complete their allergy list.
    *   renders horizontal, tappable list items based on the hardcoded
    *   allergy list. toggleItem() is called every time a checkbox item is
    *   tapped. Tapping 'FINISH' calls submitAllergiesRegistration().
    */
    render() {
        return (
            <React.Fragment>
                <TouchableWithoutFeedback 
                onPress = {Keyboard.dismiss} 
                accessible = {false}>                  
                    <View>
                        <Text style = {styles.headerText1}>
                        Please select your known allergies.</Text>
                        <Text style = {styles.headerText2}>
                        This way we know which recipies to show you and which ones we shouldn't.</Text>
                        {this.state.items && this.state.items.map(item => (
                            <CheckBox 
                            key = {item.name}
                            title = {item.name}
                            checked = {item.checked}
                            onPress = {this.toggleItem(item.name)}
                            />
                        ))}
                            <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = {this.submitAllergiesRegistration}>
                                <Text
                                style = {styles.submitText}>
                                    FINISH
                                </Text>
                            </TouchableOpacity>
                        </View>
                </TouchableWithoutFeedback>
            </React.Fragment>
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
    headerText1: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        marginTop: 5
    },
    headerText2: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
        marginTop: 5
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: Constants.deviceHeight * 0.05,
        marginBottom: Constants.deviceHeight * 0.05,
        width: Constants.deviceWidth * 0.6,
        paddingVertical: Constants.deviceHeight * 0.02,
        borderRadius: 20,
        backgroundColor: '#5CA61B',
    },
    submitText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color:'white'
    },
});