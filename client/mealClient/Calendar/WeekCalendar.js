//@ts-check
import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, InteractionManager } from 'react-native';
import Week from './Week';
import { Constants } from '../constants';

export default class WeekCalendar extends React.Component {
  // specialized render week view with days
  constructor(props)
  {
    super(props);
    InteractionManager.runAfterInteractions(()=>{
      for(var i=0;i<this.props.days.length;i++){
        if(this.props.days[i].selected===2){
          let offset = Math.floor(i / 7);
          this.scroll.scrollTo({x: Constants.deviceWidth * offset,y:0,animated:true,duration:500});
        }
      }
    });
  }

  /**
   * Renders the week view of the calender with swip functionality
   * to go through the week of a month
   */
  render() {
    const { days, toggleDaySelected } = this.props;
    return (
      <ScrollView pagingEnabled={true} horizontal={true} contentContainerStyle={styles.scrollContainer}
      ref={(ref)=> this.scroll = ref}
      >
        <View style={styles.container}>
          <Week days={days.slice(0, 7)} toggleDaySelected={toggleDaySelected}/>
        </View>
        <View style={styles.container}>
          <Week days={days.slice(7, 14)} toggleDaySelected={toggleDaySelected}/>
        </View>
        <View style={styles.container}>
          <Week days={days.slice(14, 21)} toggleDaySelected={toggleDaySelected}/>
        </View>
        <View style={styles.container}>
          <Week days={days.slice(21, 28)} toggleDaySelected={toggleDaySelected}/>
        </View>
        <View style={styles.container}>
          <Week days={days.slice(28, 35)} toggleDaySelected={toggleDaySelected}/>
        </View>
        <View style={styles.container}>
          <Week days={days.slice(35, 42)} toggleDaySelected={toggleDaySelected}/>
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
    width: Constants.deviceWidth,
  },
  dayTitleBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 20,
  },
  scrollContainer: {
    alignItems: 'stretch',
  },
  dayTitle: {
    flex: 1,
    fontSize: 10,
    justifyContent: 'center',
  }
});
