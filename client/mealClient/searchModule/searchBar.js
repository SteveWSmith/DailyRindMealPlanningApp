import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import SearchList from './searchList'
import {Constants, Variables} from '../constants'

const url = Constants.URL;
const search = '/meal/search'
const favorites = ''
const suggest = ''

export default class SearchBar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            placeholder: "What's cookin?",
            placeholderTextColor: '#777',
            text: "",
            renderState: 'normal',
            searchData: [],
            errorMsg: '',
            month: props.month,
            year: props.year,
            day: props.day
        }
    }

    // Update the current state of the text the user inputs
    updateText = (updatetext) =>{
        this.setState(()=>{
            return{
                text: updatetext,
            }
        })
    }

    /* 
    when the user presses the search button
    the application calls the server using a post method
    passing the server:
        token: auth_token
        user_id: user_id
        meal_name: the meal the user searched for
        from_val: start of the list
        to_val: end of the list
    */
    onPressButton = () =>{
        let data = {
            method: 'POST',
            body: JSON.stringify({
                token: Variables.auth_token,
                user_id: Variables.user_id,
                meal_name: this.state.text,
                from_val: 0,
                to_val: 6,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url+search, data)
        .then((reponse)=>reponse.json())
        .then((data)=>{
            if(data.success){
                this.setState({
                    renderState: 'search',
                    searchData: [],
                },()=>{
                    this.setState({
                        searchData: data.meals
                    });
                });
            }
            else{
                this.setState(state=>{
                    return{
                        renderState: 'fail',
                        errorMsg: data.error_msg,
                    }
                })
            }
        })
        .catch(function(err) {
            throw err;
        });
    }

    onFocusButton = () => {
        // TODO: Load previous searches
    }

    /**
     * depending on the state
     * renders 1 of 3 states
     * normal: nothing to reader
     * focus: shows previous searches (TODO: unimplemented)
     * searh: renders the searched for values
     * @param {an object containing information from the parent} props 
     */
    RenderStaterenderer(props){
        switch (props.renderState) {
            case 'normal':
                return(
                    <React.Fragment>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.textBar}
                                onChangeText={(text) => this.updateText(text)}
                                onFocus={()=> this.onFocusButton()}
                                placeholder={this.state.placeholder}
                                placeholderTextColor={this.state.placeholderTextColor}
                            />
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={() => this.onPressButton()}
                            >
                                <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <SearchList navi={this.props.navi} items={this.state.searchData} month={this.state.month} year={this.state.year} day={this.state.day}/>
                    </React.Fragment>
                )
                break;

            case 'focus':
                return(
                    <React.Fragment>
                        <View style={styles.container}>
                            <TextInput
                            style={styles.textBar}
                            onChangeText={(text) => this.updateText(text)}
                            onFocus={()=> this.onFocusButton()}
                            placeholder={this.state.placeholder}
                            placeholderTextColor={this.state.placeholderTextColor}/>
                            <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => this.onPressButton()}>
                            <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <SearchList navi={this.props.navi} items={this.state.searchData} month={this.state.month} year={this.state.year} day={this.state.day}/>
                    </React.Fragment>
                );
            break;

            case 'search':
                return(
                    <React.Fragment>
                        <View style={styles.container}>
                            <TextInput
                            style={styles.textBar}
                            onChangeText={(text) => this.updateText(text)}
                            onFocus={()=> this.onFocusButton()}
                            placeholder={this.state.placeholder}
                            placeholderTextColor={this.state.placeholderTextColor}/>
                            <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => this.onPressButton()}>
                            <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <SearchList navi={this.props.navi} items={this.state.searchData} month={this.state.month} year={this.state.year} day={this.state.day}/>
                    </React.Fragment>
                );
            break;

            case 'fail':
                return(
                    <React.Fragment>
                        <View style={styles.container}>
                        <TextInput
                            style={styles.textBar}
                            onChangeText={(text) => this.updateText(text)}
                            onFocus={()=> this.onFocusButton()}
                            placeholder={this.state.placeholder}
                            placeholderTextColor={this.state.placeholderTextColor}/>
                            <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => this.onPressButton()}>
                            <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>
                            {this.state.errorMsg}
                        </Text>
                    </React.Fragment>
                );
            break;
        
            default:
            return(
                <Text>Rendering nooting</Text>
            )
                break;
        }
    }

    render() {
        return this.RenderStaterenderer({renderState: this.state.renderState})
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    height: Constants.deviceHeight * 0.05,
    width: Constants.deviceWidth * 0.7,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  buttonText: {
    paddingLeft: Constants.deviceWidth * 0.01,
    paddingRight: Constants.deviceWidth * 0.01,
  }
});