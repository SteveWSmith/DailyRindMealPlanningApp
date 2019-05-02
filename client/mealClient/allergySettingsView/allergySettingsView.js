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
  ScrollView,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Constants, Variables} from '../constants';

export default class allergySettingsView extends React.Component {
    static navigationOptions = {
        title: 'Allergy Settings',
        headerTintColor:'white',
        gesturesEnabled:true
    };
    
    constructor(props){
        super(props);
        this.state = {
            /*  
            *   Set initial state of checkbox list to all false values
            *   'items' is an array of objects containing allergy names
            *   as well as a boolean value to hold whether they have been checked
            */  
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
                },
            ]
        }
    }

    /*
    *   componentDidMount() is called as soon as the screen is rendered.
    *   
    *   Post request that includes the user's authentication token and their
    *   unique id. If request is successful, server sends back an integer array
    *   that defines which allergies the user has checked. The state is then set
    *   to represent the user's previously defined allergy list.
    */
    componentDidMount() {    
        let URL = Constants.URL + '/allergies/view/user';
        let data = {
            method:'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id
            }),
            header:{
                'Content-Type':'application/json'
            }
        }
        fetch(URL, data)
        .then((response) => response.json())
        .then((responseJson) => {
            const myAllergies = responseJson.allergies;
            let myList = this.state.items;
            for(let i=0;i<myAllergies.length;i++){
                myList[i].checked = (myAllergies[i] == 1 ? true : false);
            }
            this.setState({myList});
        });
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
    *   submitAllergies is an anonymous function that initializes
    *   an initial empty array to be modified based on 
    *   what allergies a user has selected that will then be sent to the
    *   server. 0 is pushed into the array if an item is unchecked. 1 is
    *   pushed into the array if an item is checked.
    * 
    *   Post request is sent to the server.
    *   Includes user's authentication token, their id, and
    *   the modified array containing the selected allergies.
    * 
    *   If post request was successful displays feedback and automatically
    *   navigates to back to the settings menu.
    *   If unsuccessful, warning message is displayed and user is able to 
    *   try again.
    */
    submitAllergies = () => { 
        let allergiesToSend = [];
        for(let i = 0 ; i < this.state.items.length ; i++) {
            allergiesToSend.push((this.state.items[i].checked===true ? 1 : 0));
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
            if(responseJson.success === true){
                this.navigateToLogin
                Alert.alert(
                    'Allergies updated successfully!',
                    'Your ingredient filters have been updated.',
                    [
                        {text: 'OK',
                        onPress: () => this.props.navigation.navigate('settingsView', {cameFrom: 'allergySettingsView'})}
                    ]
                )
            }
            else {
                Alert.alert(
                    'Update failed.',
                    'There may be server issues, please try again.',
                    [
                        {text: 'OK'}
                    ]
                )
            }
        });
    }

    /*
    *   Render UI components.
    *   Displays text intrustions for user to complete their allergy list.
    *   renders horizontal, tappable list items based on the hardcoded
    *   allergy list and the returned integer array that is based on users
    *   previously defined allergy list. toggleItem() is called every time 
    *   a checkbox item is tapped. Tapping 'Submit' calls submitAllergies().
    */
    render() {
        return (
            <React.Fragment>
                <TouchableWithoutFeedback 
                onPress = {Keyboard.dismiss} 
                accessible = {false}>
                    <ScrollView>
                        <View>
                        {this.state.items && this.state.items.map(item => (
                            <CheckBox
                            key = {item.name}
                            title = {item.name}
                            checked = {item.checked}
                            onPress = {this.toggleItem(item.name)}
                            />
                        ))}
                        </View>
                        <View
                            style = {styles.view2}
                        >
                            <TouchableOpacity
                                style = {styles.submitButton}
                                onPress = {this.submitAllergies}
                            >
                                <Text
                                    style = {styles.submitText}
                                >
                                    SUBMIT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </React.Fragment>
        )
    }
}

/*
*   'styles' constant contains styling for all UI components
*/
const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
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
    view2: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});