import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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



export default class ShowFamily extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // birthDate: null,
            // status: '',
            // city: '',
            // proximity: '',
            // firstName: '',
            // lastName: '',
            // showCalender: false

        };
    }

    // componentDidMount() {

    // }

    render() {
        return (
            <View>
                <Text>First Name: {this.props.person.FirstName}</Text>
                <Text>Last Name: {this.props.person.LastName}</Text>
                <Text>Proximity: {this.props.person.Proximity}</Text>
                <Text>BirthDate: {this.props.person.BirthDate}</Text>
                <Text>Status: {this.props.person.Status}</Text>
                <Text>City: {this.props.person.City}{'\n'}</Text>
            </View>
        );
    }

}   