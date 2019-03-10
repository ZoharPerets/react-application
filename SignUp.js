import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';


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

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    }

    signUp = () => {
        const { firstName, lastName, email, password } = this.state;

        const paramsObj =
            {
                email,
                password,
                firstName,
                lastName
            };

        console.log(paramsObj);

        fetchData(`${WebServiceURL}SignUp`, paramsObj)
            .then((user) => {
                if (user === null) {
                    alert('פרטים שגויים');
                }
                else {
                    console.log(user);
                    this.props.navigation.navigate('Settings', { user });
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

      
    }

    render() {
        return (
            <View>
                <Text>First Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(firstName) => this.setState({ firstName })}
                    value={this.state.firstName}
                />
                <Text>Last Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(lastName) => this.setState({ lastName })}
                    value={this.state.lastName}

                />
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
                <Text>Confirm Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Sign Up"
                    onPress={this.signUp}
                />
            </View>
        );
    }
}
