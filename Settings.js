import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Imagpicker from '../components/Imagepicker';


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


export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token:'',
            userid:'',
            birthDate: null,
            status: '',
            city: '',
            level: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            showCalender: false


        };
    }


    update = () => {
        const {token, birthDate, status, city, level, email, password, firstName, lastName, userid } = this.state;

        const paramsObj =
            {
                token,
                userid,
                birthDate,
                status,
                city,
                level,
                email,
                password,
                firstName,
                lastName
            };

        console.log(paramsObj);

        fetchData(`${WebServiceURL}UpdateUser`, paramsObj)
            .then((user) => {
                if (user === null) {
                    alert('פרטים שגויים');
                }
                else {
                    console.log(user);

                    this.props.navigation.navigate('PersonalProfile', { user })
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

        // NextPage
        //const { user } = this.props.navigation.state.params;
        //this.setState({firstName: user.FirstName, lastName: user.LastName});
    }

    componentDidMount() {
        const { user } = this.props.navigation.state.params;

        this.setState({
            token: user.Token,
            userid: user.UserID,
            email: user.Email,
            password: user.Password,
            firstName: user.FirstName,
            lastName: user.LastName,
            status: user.Status,
            birthDate: user.BirthDate,
            level: user.Level,
            city: user.City,


        });

       
    }

    render() {
        return (
            <View>




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

                <Text>Level</Text>
                <Picker
                    selectedValue={this.state.level}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => this.setState({ level: itemValue })}>
                    <Picker.Item label="Select level" value="0" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                </Picker>



                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder={this.state.email}

                />
                <Text>Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder={this.state.password}
                    secureTextEntry={true}
                />
                <Text>Confirm Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder={this.state.password}
                    secureTextEntry={true}
                />
                 <Imagpicker/>
                
                <Button
                    title="Update"
                    onPress={this.update}
                />
            </View>
        );
    }
}
