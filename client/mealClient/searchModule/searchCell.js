import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Constants } from '../constants';

export default class SearchCell extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            imageUrl: props.image,
            id: props.id,
            month: props.month,
            year: props.year,
            day: props.day
        }
    }

    /*
        Called when the user presses one the cells
        this transition to the view associated with
        the cell
    */
    onPressCell = () =>{
        const { navigate } = this.props.navi;
        return navigate('mealDescription', {cameFrom: "searchModule", meal_id: this.state.id, calendar_passing: {month:this.state.month,day:this.state.day,year:this.state.year}})
    }

    render() {
        return (
            <View style={styles.containerOuter}>
                <TouchableOpacity onPress={this.onPressCell}>
                    <View style={styles.container}>
                        <Image
                         source={{ uri: this.state.imageUrl}}
                         style={{width: 50, height: 50}}
                         />
                        <Text style={styles.textformat}>{this.state.title}</Text>
                    </View> 
                </TouchableOpacity>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#aaa',
    borderBottomWidth: 1,
    paddingTop: Constants.deviceHeight * 0.001,
    paddingBottom: Constants.deviceHeight * 0.001,
    paddingLeft: Constants.deviceWidth * 0.001,
    flexDirection: 'row',
  },
  textformat:{
    paddingLeft: Constants.deviceWidth * 0.03,
    fontSize: 20,
    color:'green'
  },
  containerOuter: {
  }
});