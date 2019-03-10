import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ShowFamily from '../components/ShowFamily';

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



export default class FamilyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            birthDate: null,
            status: '',
            city: '',
            proximity: '',
            firstName: '',
            lastName: '',
            showCalender: false,
            arrProps:[],
            output: []

        };

        this.index = 0;
    }

    componentDidMount() {
        const { user } = this.props.navigation.state.params;

        const paramsObj =
            {
                userID: user.UserID
            };

        console.log(paramsObj);

        fetchData(`${WebServiceURL}GetFamily`, paramsObj)
            .then((family) => {
                if (family.lenfth === 0) {//מקבל list
                    alert('אין לך משפחה');
                }
                else {
                    console.log(family);
                    this.setState({arrProps:family});
                    
                    let output = family.map(function (person) {
                        return <ShowFamily key={this.index++} person={person} />
                    }, this);

                    this.setState({ output: output });
        
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

     
    }

    add = () => {
        const { birthDate, status, city, level, firstName, lastName, proximity } = this.state;
        const { user } = this.props.navigation.state.params;

        const paramsObj =
            {
                userID: user.UserID,
                firstName,
                lastName,
                status,
                birthDate,
                city,
                proximity
            };

        console.log(paramsObj);




        fetchData(`${WebServiceURL}InsertFamily`, paramsObj)
            .then((family) => {
                if (family === null) {
                    alert('אין לך משפחה');
                }
                else {
                    console.log(family);
                  
                    let output = family.map(function (person) {
                        return <ShowFamily key={this.index++} person={person} />
                    }, this);

                    this.setState({ output: output });
                 
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });
    }

    game = () => {
        const { user } = this.props.navigation.state.params;
        
        const  paramsGame=
        {
            userID: user.UserID,
            arr: this.state.arrProps
        };
        this.props.navigation.navigate('GameFamily', { paramsGame })
        

    }

 


    render() {
        return (
            <View>


                {this.state.output}

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
                <Button
                    title="Birth Date"
                    onPress={() => {
                        this.state.showCalender ? this.setState({ showCalender: false }) : this.setState({ showCalender: true });
                    }}
                />

                <Text>{this.state.birthDate}</Text>

                {this.state.showCalender === false ? <View></View> :
                    <Calendar
                        onDayPress={(day) => { this.setState({ birthDate: day.dateString, showCalender: false }) }}
                        monthFormat={'MM yyyy'}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={1}
                        showWeekNumbers={true}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                    />
                }

                <Text>Status</Text>
                <Picker
                    selectedValue={this.state.status}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => this.setState({ status: itemValue })}>
                    <Picker.Item label="Select status" value="0" />
                    <Picker.Item label="Single" value="Single" />
                    <Picker.Item label="Married" value="Married" />
                    <Picker.Item label="Divorced" value="Divorced" />
                    <Picker.Item label="Widower" value="Widower" />
                </Picker>

                <Text>City</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(city) => this.setState({ city })}
                    value={this.state.city}

                />

                <Text>Proximity</Text>
                <Picker
                    selectedValue={this.state.proximity}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => this.setState({ proximity: itemValue })}>
                    <Picker.Item label="Select proximity" value={null} />
                    <Picker.Item label="Brother" value="Brother" />
                    <Picker.Item label="Sister" value="Sister" />
                    <Picker.Item label="Mother" value="Mother" />
                    <Picker.Item label="Father" value="Father" />
                    <Picker.Item label="Son" value="Son" />
                    <Picker.Item label="Daughter" value="Daughter" />
                </Picker>


                <Button
                    title="Add"
                    onPress={this.add}
                />

                <Button
                    title="Start Game"
                    onPress={this.game}
                />

          </View>
        );
    }

}   