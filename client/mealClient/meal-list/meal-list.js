/*
*   Author: Katie
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*   TODO: Change width to use deviceWidth and Height
*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { 
  Constants, 
  Variables 
} from '../constants.js'

export default class MealList extends React.Component {
  static navigationOptions = { title: 'Main' }

  /*
  * Setup to retrieve meals for date
  * it gets month,day,year from previous screen
  * it will also setup for loading meals
  */
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      from_val: 0,
      to_val: 99,
      month: props.month,
      year: props.year,
      day: props.day,
      navi: props.navi
    };
    this.state.navi.addListener(
      'willFocus',
      payload=>{
        this.loadMeals();
      }
    )
  }

  /*
  * to update receive meals
  */
  componentWillReceiveProps(newProps) {
    this.setState({
      day: newProps.day,
      month: newProps.month,
      year: newProps.year,
    });
    this.loadMeals2(newProps);
  }

  /*
  * navigates to searchModule
  */
  navigateToSearch() {
    this.state.navi.navigate('searchModule', { cameFrom: 'calendar', month: this.state.month, day: this.state.day, year: this.state.year})
  } 

  /*
  * does server call to retrieve meals for date
  * if it worked then update meals
  * else empty meals
  */
  loadMeals2(newProps) {
    const myURL = Constants.URL + '/meal/view';
    let data = {
      method: 'POST',
      body: JSON.stringify({
        user_id: Variables.user_id,
        token: Variables.auth_token,
        year: '' + newProps.year,
        month: '' + newProps.month,
        day: '' + newProps.day,
        from_val: '' + this.state.from_val,
        to_val: '' + this.state.to_val
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(myURL, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          const meals = data.meals;
          this.setState({ meals });
        } else {
          const meals = [];
          this.setState({meals});
        }
      });
  }

  /*
  * does server call to retrieve meals for date
  * if it worked then update meals
  * else empty meals
  */
  loadMeals() {
    const myURL = Constants.URL + '/meal/view';
    let data = {
      method: 'POST',
      body: JSON.stringify({
        user_id: Variables.user_id,
        token: Variables.auth_token,
        year: '' + this.state.year,
        month: '' + this.state.month,
        day: '' + this.state.day,
        from_val: '' + this.state.from_val,
        to_val: '' + this.state.to_val
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(myURL, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          const meals = data.meals;
          this.setState({ meals });
        } else {
          const meals = [];
          this.setState({meals});
        }
      });
  }

  // loads meals at the beggining
  componentWillMount() {
    this.loadMeals();
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ScrollView
          style={styles.scroll_view}>
            <FlatList
              keyExtractor = {(item,index)=>index.toString()}
              data={this.state.meals}
              renderItem={({ item }) =>
                <TouchableOpacity style={{flexDirection: 'row'}}
                  onPress={() => {this.props.navi.navigate('mealDescription',
                      {
                        cameFrom:'calendar',
                        meal_id:item.meal_id,
                        calendar_passing:{calendar_id:item.calendar_id}
                      }
                    )}}>
                  <Image source={{ uri: item.pic_url }} style={styles.imageStyle} />
                  <View style={styles.listContainer}>
                    <Text style={styles.mealsContainer}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>}
            />
          </ScrollView>

          <TouchableOpacity 
            style={styles.button}
            onPress= {() => this.navigateToSearch()}
          >
            <Text style={styles.buttonTitle}>Add Meal</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  scroll_view:{
    height: Constants.deviceHeight*0.55
  },
  listContainer: {
    padding: 20, 
    flexDirection: 'row', 
    width: 300
  },
  button: {
    marginTop: Constants.deviceHeight * .03,
    marginBottom: Constants.deviceHeight * 0.125,
    width: Constants.deviceWidth * 0.6,
    paddingVertical: Constants.deviceHeight * 0.01,
    backgroundColor: "#5CA61B",
    borderRadius: 20
  },
  buttonTitle: {
    bottom: 0,
    fontSize: 35,
    color: "#FFFFFF",
    textAlign: 'center',
    alignSelf: 'center'
  },
  mealsContainer: {
    fontSize: 18,
    flexWrap: 'wrap'
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderWidth: 10,
    borderColor: '#fff',
  },
});
