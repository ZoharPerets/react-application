import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ShowFriends from '../components/ShowFriends';
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



export default class FriendsProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            birthDate: null,
            status: '',
            city: '',
            firstName: '',
            lastName: '',
            showCalender: false,
            arrProps:[],
            output: [],
            headerData:['First Name','Last Name','Birth Date','Status','City']
            

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

        fetchData(`${WebServiceURL}GetFriend`, paramsObj)
            .then((friend) => {
                if (friend.length === 0) {
                    alert('אין לך חברים');
                }
                else {
                    console.log(friend);
                    this.setState({arrProps:friend});
                    
                    let output = friend.map(function (person) {
                        return <ShowFriends key={this.index++} person={person} />
                    }, this);

                    this.setState({ output: output });
                   
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

       
    }

    add = () => {
        const { birthDate, status, city, level, firstName, lastName } = this.state;
        const { user } = this.props.navigation.state.params;

        const paramsObj =
            {
                userID: user.UserID,
                firstName,
                lastName,
                status,
                birthDate,
                city
                
            };

        console.log(paramsObj);




        fetchData(`${WebServiceURL}InsertFriends`, paramsObj)
            .then((friend) => {
                if (friend.length === 0) {
                    alert('אין לך חברים');
                }
                else {
                    console.log(friend);
                  

                    let output = friend.map(function (person) {
                        return <ShowFriends key={this.index++} person={person} />
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
        
        const paramsGame= 
        {
            userID: user.UserID,
            arr: this.state.arrProps
        }
        console.log(paramsGame);
        this.props.navigation.navigate('GameFriends', { paramsGame })
        
    }

  
    render() {
        return (
            <View style={{marginTop:20}}>

                 <View>
                     <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                         <Row Data={this.state.headerData}style={styles.head} textStyle/> 
                         {this.state.output}
                         </Table>
                     </View>
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
const styles = StyleSheet.create({
    //container: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    
  });