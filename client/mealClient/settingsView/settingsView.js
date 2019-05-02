/*
*   Author: Steve W. Smith Jr.
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*/
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  AsyncStorage,
  BackHandler
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Constants, Variables} from '../constants';

export default class settingsView extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerTintColor:'white',
        gesturesEnabled:true
    };

    constructor(props){
        super(props);
    }

    // Anonymous navigation fucntions for respective screens.
    navigateToLogin = () => this.props.navigation.navigate('login', {cameFrom: 'settingsView'})
    navigateToSecurity = () => this.props.navigation.navigate('securitySubView', {cameFrom: 'settingsView'})
    navigateToAllergies = () => this.props.navigation.navigate('allergySettingsView', {cameFrom: 'settingsView'})
    navigateToClearCalendar = () => this.props.navigation.navigate('clearCalendarView', {cameFrom: 'settingsView'})
    navigateToDeleteProfile = () => this.props.navigation.navigate('deleteProfileView', {cameFrom: 'settingsView'})
    
    /*
    *   An asynchronous function to be performed after logoutFunc()'s post 
    *   request returns successful. Removes the users unique ID and 
    *   authentication token and then navigates back to the login screen.
    */
    async clearData(){
        const {navigate} = this.props.navigation;
        try {
          await AsyncStorage.multiRemove(['authToken','userID']).then(()=>{
            return navigate('login', {cameFrom: 'settingsView'});
          });
        } catch (error) {
            return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }
    }

    /*
    *   Post request is sent to the server. 
    *   Includes the user's unique ID and authentication token. If the 
    *   post request is successful, clearData() is called as the user's
    *   authentication oken is no longer valid. If unsuccessful, 
    *   no critical changes are made.
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
                this.clearData();
                Alert.alert(
                    'You were successfully logged out.',
                    'Others may now log in.',
                    [
                        {text: 'OK'}
                    ]
                )
            } 
            else { //request failed
                Alert.alert(
                    'Log out failed.',
                    'There may be server issues, please try again.',
                    [
                        {text: 'OK'}
                    ]
                )
            }
        }) 
    }
/*
  *   Render UI components.
  *   Flatlist objects are initialized and assigned navigation fucnctions
  *   through the settingsList array. The logout option is the only option
  *   that does not immediately utilize a navigation function, but rather calls
  *   logoutFunc() when the user confirms the action.
  */
    render() {
    const settingsList = [
        {key: 'securityKey', setting: 'Security Settings', sub: 'Change email address / password', func: this.navigateToSecurity},
        {key: 'allergyKey', setting: 'Allergy Settings', sub: 'Add or Remove allergies', func: this.navigateToAllergies},
        {key: 'clearKey', setting: 'Clear Calendar', sub: 'Removes all planned meals (WARNING)', func: this.navigateToClearCalendar},
        {key: 'deleteKey', setting: 'Delete Profile', sub: 'Removes all data and delete profile (WARNING)', func: this.navigateToDeleteProfile},
        {key: 'logoutKey', setting: 'Log Out', sub: 'Log out from the application', 
            func: () => Alert.alert(
                'Are you sure you want to log out?',
                '',
                [
                    {text: 'Cancel'},
                    {text: 'OK',
                    onPress: () => this.logoutFunc()}
                ]
        )}];
        return (
            <FlatList
            data = {settingsList}
            scrollEnabled = {false}
            renderItem = {({item}) => {
                return(
                    <View>
                        <TouchableOpacity>
                            <ListItem
                            title = {item.setting}
                            titleStyle = {styles.titleFont}
                            subtitle = {item.sub}
                            subtitleStyle = {styles.subFont}
                            topDivider = {true}
                            bottomDivider = {true}
                            rightIcon = {{name: 'chevron-right'}}
                            onPress = {item.func}
                            />
                        </TouchableOpacity>
                    </View>
                )}}>
            </FlatList>
        )
    }
}

/*
*   'styles' constant contains styling for all UI components
*/
const styles = StyleSheet.create({
    titleFont: {
        fontSize: 36,
        color:'green'
    },
    subFont: {
        fontSize: 16,
        color: '#7F8A9C'
    },
    logoutStyle: {
        textAlign: 'center'
    }
});