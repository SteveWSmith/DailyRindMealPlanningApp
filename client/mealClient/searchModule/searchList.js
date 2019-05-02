import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import SearchCell from './searchCell';
import { Constants } from '../constants';


export default class SearchList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      month: props.month,
      year: props.year,
      day: props.day
    };
  }

    /**
     * Renders a list of items passed to it from the parent component
     */
    render() {
        return (
            <View style={styles.container}>
            <FlatList 
              style={styles.listStyle}
              data={this.props.items}
              renderItem={({ item }) => <SearchCell navi={this.props.navi} id={item.id} title={item.name} image={item.img_url} month={this.state.month} year={this.state.year} day={this.state.day}/>}
              keyExtractor = {(item,index)=>index.toString()}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle:{
      borderWidth: 1,
      borderColor: '#fff',
      alignSelf: 'stretch',
      width: Constants.deviceWidth,
  }
});