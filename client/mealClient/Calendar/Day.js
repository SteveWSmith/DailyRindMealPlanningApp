// @ts-check
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export default class Day extends React.Component {
  
  // what to do when a date is pressed
  onDayPressed = () => {
    this.props.toggleDaySelected(this.props.dateInfo)
  }
  
  /**
   * renders the day based on 3 different states
   * 1 -> the day is unselected but should be rendered
   * 2 -> the day is selected and is highlighted
   * 3 -> unrendered
   */
  render() {
    switch(this.props.selection) {
      case 1:
        return (
          <TouchableOpacity style={styles.unselected} onPress={this.onDayPressed}>
            <Text style={styles.container}>{this.props.date}</Text>
          </TouchableOpacity>
        )
      case 2:
        return (
          <TouchableOpacity style={styles.selected} onPress={this.onDayPressed}>
            <Text style={styles.container}>{this.props.date}</Text>
          </TouchableOpacity>
        );
      case 3:
        return (
          <TouchableOpacity style={styles.undated} onPress={()=>{}}>
            <Text style={styles.container}>{this.props.date}</Text>
          </TouchableOpacity>
        );
      }
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#222',
  },
  unselected: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },

  selected: {
    flex: 1,
    backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },

  undated: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  },
});