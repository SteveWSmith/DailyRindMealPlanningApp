import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import {
  StyleSheet,
} from 'react-native';

/*for navigation, the names from the import statements are exactly the same as the screen names. 
use these when implementing your own code*/

//ASK FOR EMAIL- FORGOT PASSWORD: Zach
import askEmail from './askEmail/askEmail';
//ANSWER SECURITY QUESTION: Caitlyn
import answerSecurityQuestion from './answerQuestionView/answerQuestion';
//CALENDAR: Jahwaan
import calendar from './Calendar/Calendar';
//CHANGE EMAIL: Katie
import changeEmail from './change-email/change-email';
//CHANGE PASSWORD: Zach
import changePass from './changePass/changePass';
//LOGIN: Zach
import login from './login/login';
//MEAL DESCRIPTION: Jacob
import mealDescription from './mealDescription/mealDescription';
//MEAL LIST: Katie
import mealList from './meal-list/meal-list';
//REGISTER VIEW: Caitlyn
import registerView from './registerView/register';
//SEARCH MODULE: Jahwaan
import searchModule from './searchModule/searchModule';
//SECURITY QUESTION: Jacob
import securityQuestion from './securityQuestion/securityQuestion';
//SETTINGS VIEWS: Steve
import settingsView from './settingsView/settingsView';
import securitySubView from './settingsView/securitySubView';
import deleteProfileView from './settingsView/deleteProfileView';
import clearCalendarView from './settingsView/clearCalendarView';
//ALLERGY SETTINGS VIEWS: Steve
import allergySettingsView from './allergySettingsView/allergySettingsView';
import allergyRegistrationView from './allergySettingsView/allergyRegistrationView';
import splash from './splash/splash';

const MainNavigator = createStackNavigator({
  askEmail: {screen: askEmail},
  answerSecurityQuestion: {screen: answerSecurityQuestion},
  calendar: {screen: calendar},
  changeEmail: {screen: changeEmail},
  changePass: {screen: changePass},
  settingsView: {screen: settingsView},
  securitySubView: {screen: securitySubView},
  deleteProfileView: {screen: deleteProfileView},
  clearCalendarView: {screen: clearCalendarView},
  login: {screen: login},
  mealDescription: {screen: mealDescription},
  mealList: {screen: mealList},
  registerView: {screen: registerView},
  searchModule: {screen: searchModule},
  securityQuestion: {screen: securityQuestion},
  allergySettingsView: {screen: allergySettingsView},
  allergyRegistrationView: {screen: allergyRegistrationView},
  splash: {screen: splash},
}, 

{
  initialRouteName: 'splash',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#5CA61B',
      headerTintColor: 'white'
    },
    gesturesEnabled:false
  }
});

const AppContainer = createAppContainer(MainNavigator);
export default () => <AppContainer/>;

const styles = StyleSheet.create({ 
  
});
