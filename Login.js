import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import Notification from '../components/Notification';

const WebServiceURL = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/SITE15/WakeUpMemory.asmx/";


function fetchData(url, paramsObj) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(paramsObj),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(response => JSON.parse(response.d))
}


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: ''

        };
    }
    
    componentDidMount() {

    }

    login = async() => {
        
        const myToken = await Notification.registerForPushNotificationsAsync();
        this.setState({token: myToken});
        const { email, password,token } = this.state;
        
        
        const paramsObj =
            {
                email,
                password,
                token
            };

        fetchData(`${WebServiceURL}LoginUser`, paramsObj)
            .then((user) => {
                if (user === null) {
                    alert('פרטים שגויים');
                }
                else {
                    console.log(user);
                    //mail:zohar,pass:1234
                    this.props.navigation.navigate('PersonalProfile', { user });
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

          
    }


    render() {
        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <Text>Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={this.login}
                />
            </View>
        );
    }
}
