// @ts-check
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import WeekCalendar from './WeekCalendar';
import FullCalendar from './FullCalendar';
import DayTitleBar from './DayTitleBar';
import MealList from '../meal-list/meal-list';
import {
  BackHandler
} from 'react-native';

import {
  getMonthData,
  getDateISO,
  getNextMonth,
  getPrevMonth
} from './CalHelp'
import {
  Icon
} from 'react-native-elements';
import {
  Constants
} from '../constants';

export default class Calendar extends React.Component {
    static navigationOptions = ({
      navigation
    }) => {
      const {
        navigate
      } = navigation;
      return {
        headerTitle: "Home",
        headerTintColor: "white",
        headerLeft: null,
        headerRight: (<Icon
          name='cog'
          type = 'font-awesome'
          color = 'white'
          underlayColor = {
            '#64b5f6'
          }
          size = {
            40
          }
          containerStyle = {
            {
              marginRight: Constants.deviceWidth * 0.03
            }
          }
          onPress = {
            () => {
              navigate('settingsView', {
                cameFrom: 'calendar'
              })
            }
          }
          />
        )
      };
    };

    /*
    Constructor that gets the current date and
    assigns the date to the state
    */
    constructor(props) {
      super(props)
      let date = getDateISO(new Date())
      let dayData = date.split('-');
      this.state = {
        calState: 1,
        dayID: -1,
        year: parseInt(dayData[0]),
        monthID: parseInt(dayData[1]),
        date: parseInt(dayData[2]),
        days: [],

        selectedYear: parseInt(dayData[0]),
        selectedMonth: parseInt(dayData[1]),
        selectedDate: parseInt(dayData[2]),
      }
      BackHandler.addEventListener('hardwareBackPress', function () {
        return true;
      });
    }

    /*
    When the component mounts for the first time
    the state is updated and generates the days
    for 6 weeks worth of day (42 days)
    */
    componentWillMount = () => {
      let monthData = getMonthData(this.state.monthID, this.state.year)
      let day = {
        day: this.state.date,
        month: this.state.monthID,
        year: this.state.year,
      }

      this.setState((state) => {
        return {
          days: monthData.map(day => ({
            ...day,
            selected: 1
          })),
        }
      });

      this.setState(state => ({
        days: state.days.map(item => {
          if (parseInt(item.day) === day.day && parseInt(item.month) === day.month && item.year === day.year) {
            return {
              ...item,
              selected: item.selected === 1 ? 2 : 1
            }
          } else if (parseInt(item.month) !== day.month) {
            return {
              ...item,
              selected: 3,
            }
          }

          return {
            ...item,
            selected: item.selected === 2 ? 1 : item.selected
          };
        })
      }))
    }

    // Swap render state from week view to full view
    swapState = () => {
      if (this.state.calState == 1) {
        this.setState((state) => {
          return {
            calState: 2
          }
        })
      } else if (this.state.calState == 2) {
        this.setState((state) => {
          return {
            calState: 1
          }
        })
      }
    }

    // update day components
    toggleDaySelected = (day) => {
      this.setState(state => ({
        days: state.days.map(item => {
          if (parseInt(item.day) === parseInt(day.day) && parseInt(item.month) === parseInt(day.month) && item.year === day.year) {
            return {
              ...item,
              selected: item.selected === 1 ? 2 : 1
            }
          } else if (parseInt(item.month) !== parseInt(day.month)) {
            return {
              ...item,
              selected: 3,
            }
          }

          return {
            ...item,
            selected: item.selected === 2 ? 1 : item.selected
          };
        })
      }));
      this.setState(state => {
        return {
          monthID: parseInt(day.month),
          year: day.year,
          date: day.day,
          selectedDate: parseInt(day.day),
          selectedMonth: parseInt(day.month),
          selectedYear: parseInt(day.year),
        }
      });
    }

    /*
    Gets the next month and updates the state
    */
    nextMonth = () => {
      let month = getNextMonth(this.state.monthID, this.state.year)
      this.setState(state => {
        return {
          monthID: month.month,
          year: month.year,
        }
      })
      let monthData = getMonthData(month.month, month.year)
      let day = {
        day: -1,
        month: month.month,
        year: month.year,
      }

      this.setState((state) => {
        return {
          days: monthData.map(day => ({
            ...day,
            selected: 1
          })),
        }
      });

      this.setState(state => ({
        days: state.days.map(item => {
          if (parseInt(item.day) === this.state.selectedDate && parseInt(item.month) === this.state.selectedMonth && parseInt(item.year) === this.state.selectedYear) {
            return {
              ...item,
              selected: 2
            }
          } else if (parseInt(item.day) === day.day && parseInt(item.month) === day.month && item.year === day.year) {
            return {
              ...item,
              selected: item.selected === 1 ? 2 : 1
            }
          } else if (parseInt(item.month) !== day.month) {
            return {
              ...item,
              selected: 3,
            }
          }

          return {
            ...item,
            selected: item.selected === 2 ? 1 : item.selected
          };
        })
      }));
    }

    /*
    Gets the previous month and updates the state
    */
    pervMonth = () => {
      let month = getPrevMonth(this.state.monthID, this.state.year)
      this.setState(state => {
        return {
          monthID: month.month,
          year: month.year,
        }
      })
      let monthData = getMonthData(month.month, month.year)
      let day = {
        day: -1,
        month: month.month,
        year: month.year,
      }

      this.setState((state) => {
        return {
          days: monthData.map(day => ({
            ...day,
            selected: 1
          })),
        }
      });

      this.setState(state => ({
        days: state.days.map(item => {
          if (parseInt(item.day) === this.state.selectedDate && parseInt(item.month) === this.state.selectedMonth && parseInt(item.year) === this.state.selectedYear) {
            return {
              ...item,
              selected: 2
            }
          } else if (parseInt(item.day) === day.day && parseInt(item.month) === day.month && item.year === day.year) {
            return {
              ...item,
              selected: item.selected === 1 ? 2 : 1
            }
          } else if (parseInt(item.month) !== day.month) {
            return {
              ...item,
              selected: 3,
            }
          }

          return {
            ...item,
            selected: item.selected === 2 ? 1 : item.selected
          };
        })
      }));
    }

    /*
    renders the state depending on the calendarState 
    */
    render() {
      return (
        <View style={styles.container}>
        {<DayTitleBar swapFunc={this.swapState} month={this.state.monthID} prevMonth={this.pervMonth} nextMonth={this.nextMonth}/>}
        {this.state.calState === 1 ? (
          <WeekCalendar swapFunc={this.swapState} month={this.state.monthID} days={this.state.days} toggleDaySelected={this.toggleDaySelected}/>
        ) : (
          <FullCalendar swapFunc={this.swapState} month={this.state.monthID} days={this.state.days} toggleDaySelected={this.toggleDaySelected}/>
        )}
        <MealList month={this.state.selectedMonth} year={this.state.selectedYear} day={this.state.selectedDate} navi={this.props.navigation}/>
        </View>
        );
  }
  
    }

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff'
      },
    });