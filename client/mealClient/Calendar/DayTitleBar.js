//@ts-check
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default class DayTitleBar extends React.Component {

  month = [
    '[none]',
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    '[more]'
  ]

    /**
     * renders a view containing the current month, previous month, next month, and week
     * pressing the component switches the calendar state
     */
    render() {
      return (
        <View style={styles.fullContainer}>
          <TouchableOpacity style={styles.swapFuncContainer} onPress={this.props.swapFunc}>
          
          <View style={styles.monthContainer}>
            <TouchableOpacity style={styles.otherMonth} onPress={this.props.prevMonth}>
              <Text>
                {this.month[this.props.month-1]==='[none]'?'December':this.month[this.props.month-1]}
              </Text>
            </TouchableOpacity>

            <Text style={styles.currentMonth}>{this.month[this.props.month]}</Text>
            
            <TouchableOpacity style={styles.otherMonth} onPress={this.props.nextMonth}>
              <Text>
                {this.month[this.props.month+1]==='[more]'?'January':this.month[this.props.month+1]}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dayTitleBar}>
              <Text style={styles.dayTitle}> Sun </Text>
              <Text style={styles.dayTitle}> Mon </Text>
              <Text style={styles.dayTitle}> Tue </Text>
              <Text style={styles.dayTitle}> Wed </Text>
              <Text style={styles.dayTitle}> Thu </Text>
              <Text style={styles.dayTitle}> Fri </Text>
              <Text style={styles.dayTitle}> Sat </Text>
          </View>
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  swapFuncContainer:{
    justifyContent: 'center',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  dayTitleBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 20,
    width: deviceWidth,
  },
  dayTitle: {
    flex: 2,
    fontSize: 10,
    justifyContent: 'center',
  },
  otherMonth: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentMonth: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'green',
    fontWeight: 'bold',
  },
});
