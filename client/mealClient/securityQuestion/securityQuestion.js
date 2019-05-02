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
    View,
    TextInput,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Picker,
    AsyncStorage,
    BackHandler,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    Constants,
    Variables
} from '../constants';

/*This Class is used to give the user options for security questions
  and then get the answers for those questions */
export default class SecurityQuestion extends React.Component {
    static navigationOptions = {
        title: 'Security Question',
        headerTintColor: 'white',
    };

    /*These help to verify that all fields have been filled and verify that the answers match
    to help eliminate faulty entering errors and problems later when retrieving a new password */
    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.navigation.getParam('first_name'),
            last_name: this.props.navigation.getParam('last_name'),
            password: this.props.navigation.getParam('password'),
            email: this.props.navigation.getParam('email'),
            cameFrom: this.props.navigation.getParam('cameFrom'),
            security_question: 0,
            security_answer: "",
            security_answer2: "",
            answer1: "",
            answer2: "",
            error_code: "",
            error_message: "",
        }
        BackHandler.addEventListener('hardwareBackPress',function(){
            return true;
        });
    }

    //These are the two possible screens that can be navigated to from security question
    navigateToregisterView = () => this.props.navigation.navigate('registerView', {name: 'registerView'})
    
    securityQuestionHandling() {
        const URL = Constants.URL + "/auth/register";
        let data = {
            method: 'POST',
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
                security_question: this.state.security_question,
                security_answer: this.state.answer1,
                email: this.state.email,
            }),
        }
        fetch(URL, data)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    //SUCCESS:
                    Variables.auth_token = responseJson.token,
                    Variables.user_id = responseJson.user_id;
                    this.storeData(responseJson.token,responseJson.user_id);
                } //end handling for a successful response
                else {
                    //FAILURE:
                    this.setState({
                        error_code: responseJson.error_code,
                        error_message: responseJson.error_msg,
                    })//end setState
                    return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
                }//end handling for a failed response
            })
            .catch(function(err) {
                throw err;
            }) //end fetch
    }//end securityQuestionHandling

    async storeData(authToken, userID){
        const {navigate} = this.props.navigation;
        userID = ""+userID;
        try {
          await AsyncStorage.multiSet([['authToken', authToken],['userID',userID]]).then(()=>{
            return navigate('allergyRegistrationView', {cameFrom: 'securityQuestion'});
          });
        } catch (error) {
            return Alert.alert(this.state.error_code + ': ' + this.state.error_message)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior ='position'>  
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <View style = {styles.container}>
                    
                        {/*This will hold a scrolling wheel that will have a small list of security questions to choose from.
                        This will also render it the same for Android and IOS as each platform handles the picker wheel
                            differently*/}
                        <Picker
                            selectedValue={this.state.security_question}
                            style={styles.picker_wheel}//{Platform.OS === 'ios' ? { flex: 1, height: 50, width: 900 } : { height: 50, width: 325}}
                            onValueChange={(itemValue) => this.setState({security_question: itemValue})}
                            >
                            <Picker.Item label="What was your childhood nickname?" value="0" />
                            <Picker.Item label="What was your dream job as a child?" value="1" />
                            <Picker.Item label="What was your favorite food as a child?" value="2" />
                            <Picker.Item label="Who was your childhood hero?" value="3" />
                            <Picker.Item label="Where does your nearest sibling live?" value="4" />
                        </Picker>
                        {/* This will securely get the answer to the selected question */}
                        <TextInput
                            style={styles.containerAnswer1}
                            autoCapitalize='none'
                            placeholder="Enter Security Question Answer Here"
                        // returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={(answer1) => this.setState({ answer1 })}
                            ref = {'txtFist'}
                            returnKeyType='next'
                            // @ts-ignore
                            onSubmitEditing = {()=>this.refs.txtLast.focus()}
                            //underlineColorAndroid="#5CA61B"
                        />
                        {/* This will securely validate the answer to verify that it is the actual answer the user wants to submit */}
                        <TextInput
                            style={styles.containerAnswer1}
                            autoCapitalize='none'
                            placeholder="Please Re-Enter Answer Here"
                        // returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={(answer2) => this.setState({ answer2 })}
                            ref = {'txtLast'}
                            //underlineColorAndroid="#5CA61B"
                        />

                        <TouchableOpacity
                            disabled={this.state.answer1 === "" || this.state.answer2 === ""}
                            onPress={()=>{
                                (this.state.answer1 === this.state.answer2 ? this.securityQuestionHandling() : Alert.alert('The Answers Do Not Match, Please Try Again'));
                            }}
                            style = { this.state.answer1 === "" || this.state.answer2 === "" ? styles.buttonContainerDisabled : styles.buttonContainerEnabled}
                        >
                            <Text
                                style={ this.state.answer1 === "" || this.state.answer2 === "" ? styles.buttonTextDisabled : styles.buttonTextEnabled}
                            >Next</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios'? 0 : Constants.deviceHeight * .12,
        backgroundColor: '#fff',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    picker_wheel: {
        width: Constants.deviceWidth * 0.90,
    },
    containerAnswer1: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: Constants.deviceHeight * .05,
        borderBottomWidth: 2,
        borderColor: '#5CA61B',
        width: Constants.deviceWidth*0.7,
        height: Constants.deviceHeight * 0.05
    },
    next_button_spacing: {
        marginTop: Constants.deviceHeight * 0.2,
    },
    buttonContainerEnabled:{
        marginTop: Constants.deviceHeight * 0.05,
        marginBottom: Constants.deviceHeight * 0.05,
        width: Constants.deviceWidth * 0.6,
        paddingVertical: Constants.deviceHeight * 0.02,
        backgroundColor: '#5CA61B',
        borderRadius: 20
    },
    buttonContainerDisabled:{
        marginTop: Constants.deviceHeight * 0.05,
        marginBottom: Constants.deviceHeight * 0.05,
        width: Constants.deviceWidth * 0.6,
        paddingVertical: Constants.deviceHeight * 0.02,
        backgroundColor: '#CECECE',
        borderRadius: 20
    },
    buttonTextDisabled:{
        textAlign:'center',
        alignSelf: 'center',
        fontSize:18,
        fontWeight:'bold',
        color:'gray'
    },
    buttonTextEnabled:{
        textAlign:'center',
        alignSelf: 'center',
        color:'#FFF',
        fontSize:18,
        fontWeight:'bold',
    },
});
