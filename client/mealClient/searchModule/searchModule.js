import React from 'react';
import { StyleSheet, View,SafeAreaView } from 'react-native';
import SearchBar from './searchBar';
import { BackHandler } from 'react-native';

export default class SearchModule extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      month: this.props.navigation.getParam('month'),
      year: this.props.navigation.getParam('year'),
      day: this.props.navigation.getParam('day')
    };
  }

  static navigationOptions = {
    headerTintColor:'white',
    gesturesEnabled:true
  }

  /**
   * Renders the search bar and passes values to it
   * props: 
   *  navigation
   *  month
   *  day
   *  year
   */
  render() {
      return (
          <SafeAreaView style={styles.container}>
              <SearchBar navi={this.props.navigation} month={this.state.month} day={this.state.day} year={this.state.year}/>
          </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
});