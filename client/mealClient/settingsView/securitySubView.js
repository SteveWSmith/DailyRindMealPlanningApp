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
} from 'react-native';
import {ListItem} from 'react-native-elements'

export default class securitySubView extends React.Component {
  static navigationOptions = {
    title: 'Security Settings',
    headerTintColor:'white',
    gesturesEnabled:true
  };

  constructor(props){
    super(props);
  }

  /*
  *   Anonymous navigation functions to be ulized by the flatlist objects.
  */
  navigateToChangePass = () => this.props.navigation.navigate('changePass', {cameFrom: 'securitySubView'})
  navigateToChangeEmail = () => this.props.navigation.navigate('changeEmail', {cameFrom: 'securitySubView'})
  
  /*
  *   Render UI components.
  *   Mimics the parent settingsView with only two options for the user to select,
  *   'Change Email' or 'Change Password'. 
  *   Navigation functions are assigned through the subSettingsList object array.
  */
  render() {
  const subSettingsList = [
    {key: 'emailKey', setting: 'Change Email Address', sub: 'Change email address you log in with.', func: this.navigateToChangeEmail},
    {key: 'passKey', setting: 'Change Password', sub: 'Update your password.', func: this.navigateToChangePass}];
    return (
      <React.Fragment>
        <View>
            <FlatList
            data = {subSettingsList}
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
        </View>
    </React.Fragment>
      )
  }
}

/*
*   'styles' constant contains styling for all UI components
*/
const styles = StyleSheet.create({
  titleFont: {
    fontSize: 32,
    color:'green'
  },
  subFont: {
    fontSize: 16,
    color: '#7F8A9C'
  },
});
