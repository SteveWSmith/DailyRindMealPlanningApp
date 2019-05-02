//@ts-check
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Day from './Day';

export default class Week extends React.Component {
  // container to render a week
  render() {
    const { toggleDaySelected } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.dateTitleBar}>
            {this.props.days.map(day => (
              <Day
                date={day.day}
                dateInfo={day}
                id={`${day.day}-${day.month}`}
                key={`${day.day}-${day.month}`}
                selection={day.selected}
                toggleDaySelected={toggleDaySelected}
              />
            ))}
        </View>
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
  dateTitleBar: {
    flexDirection: 'row',
    width: '100%'
  },
});
