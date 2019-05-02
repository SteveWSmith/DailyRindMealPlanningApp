//@ts-check
import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Week from './Week'

const deviceWidth = Dimensions.get('window').width;

export default class FullCalendar extends React.Component {
  // render the full month view
  render() {
    const {toggleDaySelected} = this.props;
    return (
    <ScrollView pagingEnabled={true} horizontal={true} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.container}>
            <Week days={this.props.days.slice(0, 7)} toggleDaySelected={toggleDaySelected}/>
            <Week days={this.props.days.slice(7, 14)} toggleDaySelected={toggleDaySelected}/>
            <Week days={this.props.days.slice(14, 21)} toggleDaySelected={toggleDaySelected}/>
            <Week days={this.props.days.slice(21, 28)} toggleDaySelected={toggleDaySelected}/>
            <Week days={this.props.days.slice(28, 35)} toggleDaySelected={toggleDaySelected}/>
            <Week days={this.props.days.slice(35, 42)} toggleDaySelected={toggleDaySelected}/>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
  },
  dayTitleBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 20,
  },
  dayTitle: {
    flex: 1,
    fontSize: 10,
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'stretch',
  },
});