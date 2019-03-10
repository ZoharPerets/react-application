import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Table,  Row, Rows } from 'react-native-table-component';

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



export default class ShowFriends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           bodyData: []
        };
    }

     componentDidMount() {
         
         let arr = [this.props.person.FirstName, this.props.person.LastName,this.props.person.BirthDate,this.props.person.Status,this.props.person.City];
         let bodyData=this.state.bodyData;
         bodyData.push(arr);
         this.setState({bodyData:bodyData});
     }

    /* <Text>First Name: {this.props.person.FirstName}</Text>
     <Text>Last Name: {this.props.person.LastName}</Text>
     <Text>BirthDate: {this.props.person.BirthDate}</Text>
     <Text>Status: {this.props.person.Status}</Text>
     <Text>City: {this.props.person.City}{'\n'}</Text>*/

    render() {
        return (
            <View >
                 <Rows data={this.state.bodyData} />
                
            </View>
        );
    }

}   

