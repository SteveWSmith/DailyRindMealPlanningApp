/*
*   Author: Jacob
*   COSC 4319, Software Engineering
*   Slice of Life Labs
*   TODO: Change width to use deviceWidth and Height
*/
import React from 'react';
import {
    StyleSheet,
    Text,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Image,
} from 'react-native';
import { Constants, Variables } from '../constants.js';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

//This Class displays the description of each meal
export default class MealDescription extends React.Component {
    
    // enables swipe navigation for iOS
    static navigationOptions = {
        title: 'Meal Description',
        headerTintColor: 'white',
        gesturesEnabled:true
    }
    
    constructor(props){
        super(props);

        //Variables to be used throughout the program
        this.state = {
            auth_token: Variables.auth_token,
            user_id: Variables.user_id,
            meal_id: this.props.navigation.getParam('meal_id'),
            cameFrom: this.props.navigation.getParam('cameFrom'),
            calendar_passing: this.props.navigation.getParam('calendar_passing'),
            meal_name: "",
            meal_img_url: "a",
            meal_prep_time: "",
            meal_cook_time: "",
            meal_directions: [],
            meal_ingredients: [],
            //reload: this.props.navigation.getParam('reload'),
        }
    }
    
    /*Need this to so that meal description calls the server and has everything rendered for the user without
    the user needing to do anything extra */
    componentDidMount() {
        this.mealDescriptionHandling();
    }

    //Calls the server, gets everything related to the meal to display to the user
    mealDescriptionHandling() {
        const URL = Constants.URL + "/meal/id/view";
        let data = {
            method: 'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id,
                meal_id: this.state.meal_id
            }),
        }
        fetch(URL, data)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    //SUCCESS:
                    this.setState({
                        meal_name: responseJson.meal_name,
                        meal_img_url: responseJson.meal_img_url,
                        meal_prep_time: responseJson.meal_prep_time,
                        meal_directions: responseJson.directions,
                        meal_ingredients: responseJson.meal_ingredients,
                    });
                } //end handling for a successful response
                else {
                    //FAILURE:
                    this.setState({
                        error_code: responseJson.error_code,
                        error_message: responseJson.error_msg,
                    })//end setState
                    return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
                }//end handling for a failed response
            }) //end fetch
    }//end mealDescriptionHandling

    //This calls the server and adds a meal to the users calendar
    addHandling() {
        const URL = Constants.URL + "/meal/id/add";
        let data = {
            method: 'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id,
                recipe_id: this.state.meal_id,
                month: this.state.calendar_passing.month,
                day: this.state.calendar_passing.day,
                year: this.state.calendar_passing.year,
            }),
        }
        fetch(URL, data)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    //SUCCESS:
                    Alert.alert("Meal Successfully Added");
                    this.calendarHandling();
                } //end handling for a successful response
                else {
                    //FAILURE:
                    this.setState({
                        error_code: responseJson.error_code,
                        error_message: responseJson.error_msg,
                    })//end setState
                    return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
                }//end handling for a failed response
            }) //end fetch
    }//end addHandling

    //This calls the server and deletes a meal from the users calendar
    deleteHandling() {
        const URL = Constants.URL + "/meal/id/delete";
        let data = {
            method: 'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id,
                calendar_id: this.state.calendar_passing.calendar_id
            }),
        }
        fetch(URL, data)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    //SUCCESS:
                    Alert.alert("Meal Successfully Deleted");
                    this.calendarHandling();
                } //end handling for a successful response
                else {
                    //FAILURE:
                    this.setState({
                        error_code: responseJson.error_code,
                        error_message: responseJson.error_msg,
                    })//end setState
                    return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
                }//end handling for a failed response
            }) //end fetch
    }//end deleteHandling

    calendarHandling()
    {
        this.props.navigation.navigate('calendar', { cameFrom: 'mealDescription',updating:true })
    }

    /*This renders all of the information given from the server, with a function that has a conditional
    add or delete depending on which module the user came from*/
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <ScrollView
                    style={styles.scroll_view}
                >
                    <Image
                        source={{ uri: this.state.meal_img_url }}
                        style={styles.image_container}
                    />
                    <Text
                        style={styles.meal_title}
                    >
                        {this.state.meal_name}
                    </Text>
                    <Text
                        style={styles.sub_title}
                    >Ingedients</Text>
                    <FlatList
                        data={this.state.meal_ingredients}
                        renderItem={({ item }) =>
                            <Text
                                style={styles.item}
                            >{item.name} {item.amount} {item.unit}</Text>
                        }
                        keyExtractor = {(item,index)=>index.toString()}
                    />
                    <Text
                        style={styles.sub_title}
                    >Recipe Steps</Text>
                    <FlatList
                        data={this.state.meal_directions}
                        renderItem={({ item }) =>
                            <Text
                                style={styles.item}
                            >
                                {item.step}
                            </Text>
                        }
                        keyExtractor = {(item,index)=>index.toString()}
                    />
                    <Text
                        style={styles.extra_title}
                    >Estimated Prep Time: {this.state.meal_prep_time} min.</Text>
                    {this.state.cameFrom === "searchModule" ?
                        <TouchableOpacity
                            style={styles.button_container}
                            onPress={() => {this.addHandling()}}>
                            <Text
                                style={styles.green_button}
                            >Add</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button_container}
                            onPress={() => {this.deleteHandling()}}>
                            <Text
                                style={styles.red_button}
                            >Delete</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

//These format the layout of the screen for a smoother UI design
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button_container: {
        alignItems: 'center'
    },
    scroll_view: {
        height: 500
    },
    item: {
        textAlign: 'justify',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        paddingBottom: 5
    },
    meal_title: {
        fontSize: 30,
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold'
    },
    sub_title: {
        fontSize: 25,
        textAlign: 'center',
        color: 'green',
        paddingBottom: 10
    },
    extra_title: {
        color: 'green',
        fontSize: 25,
        paddingTop: 10,
        textAlign: 'center'
    },
    image_container: {
        height: Constants.deviceHeight / 4,
        width: Constants.deviceWidth,
        justifyContent: "flex-start"
    },
    red_button: {
        marginTop: Constants.deviceHeight * 0.04,
        marginBottom: Constants.deviceHeight * 0.07,
        paddingVertical: Constants.deviceHeight * 0.015,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        width: Constants.deviceWidth * 0.75,
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 6,
        textAlign: 'center'
    },
    green_button: {
        marginTop: Constants.deviceHeight * 0.04,
        marginBottom: Constants.deviceHeight * 0.07,
        paddingVertical: Constants.deviceHeight * 0.015,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        width: Constants.deviceWidth * 0.75,
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 6,
        textAlign: 'center'
    }
});
