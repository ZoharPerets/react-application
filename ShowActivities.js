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



export default class ShowAcivities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // componentDidMount() {

    // }

    render() {
        return (
            <View>
                <Text>Date : {this.props.activity.Date}</Text>
                <Text>Time: {this.props.activity.Time}</Text>
                <Text>Description: {this.props.activity.Description}{'\n'}</Text>
                {this.props.activity.Always ? <Text>Always: Yes</Text> : <Text>Always: No</Text>}
            </View>
        );
    }

}   