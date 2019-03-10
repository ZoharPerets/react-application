import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler, Picker } from 'react-native';
import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ShowActivities from '../components/ShowActivities';
import Format from '../components/Format';
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



export default class PersonalProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            UserID:'',
            Date:'',
            Time: '',
            Description: '',
            Always:'',
            Date: '' ,
            showCalender:'',
            output: []         

        };

       this.index = 0;
    }

    componentDidMount() {
        const { user } = this.props.navigation.state.params;
        this.setState({firstName: user.FirstName, lastName: user.LastName, userID: user.UserID});

        const paramsObj =
            {
                UserID: user.UserID
            };

        console.log(paramsObj);

        fetchData(`${WebServiceURL}GetActivities`, paramsObj)
            .then((activities) => {
                if (activities.length === 0) {
                    alert('אין לך פעילויות');
                }
                else {
                    console.log(activities);
                    let output = activities.map(function (activity) {
                        return <ShowActivities key={this.index++} activity={activity} />
                    }, this);

                    this.setState({ output: output });
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });

       
    }

    add = () => {
        const {Date, Always, Time, Description } = this.state;
        const{user}= this.props.navigation.params;
        const paramsObj =
            {
                userID:user.UserID,
                date,
                always,
                time,
                description
                
                
            };

        console.log(paramsObj);




        fetchData(`${WebServiceURL}InsertActivity`, paramsObj)
            .then((activity) => {
                if (activity === null) {
                    alert(' ');
                }
                else {
                    console.log(activity);
                    // let output = family.map(function (person, index) {
                    //     return <ShowFamily key={index} person={person} />
                    // }, this);

                    let output = this.state.output;
                    output.push(<ShowActivities key={this.index++} activity={activity} />);


                    this.setState({ output: output });
                    //alert(user.FirstName);
                    //this.props.navigation.navigate('Game', { user });
                    // this.props.navigation.navigate('', { user })
                }
            })
            .catch(() => {
                alert('בעיה לא ידועה');
            });
    }

   

 
    setAlways=(itemValue)=>
    {
        switch(itemValue)   
        {
            case 'yes':
            this.setState({Always:'true'})
            break;
            case 'no':
            this.setState({Always:'false'})
            break;

        }     
    }

    render() {
        const {firstName}=this.state;
        return (
            <View style ={{marginTop:25}}>
               <h1><Format firstName/> </h1>
               
                {this.state.output}
                
                <Text>Always</Text>
                <Picker
                    selectedValue={this.state.Always}
                    style={{ height: 40, width: 80 }}
                    onValueChange={(itemValue) => this.setAlways(itemValue)}>
                    <Picker.Item label="Choose if always" value="0" />
                    <Picker.Item label="yes" value="yes" />
                    <Picker.Item label="no" value="no" />
                    
                </Picker>

                <Button
                    title="Date Of Activity"
                    onPress={() => {
                        this.state.showCalender ? this.setState({ showCalender: false }) : this.setState({ showCalender: true });
                    }}
                />

                <Text>{this.state.Date}</Text>

                {this.state.showCalender === false ? <View></View> :
                    <Calendar
                        onDayPress={(day) => { this.setState({ Date: day.dateString, showCalender: false }) }}
                        monthFormat={'MM yyyy'}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={1}
                        showWeekNumbers={true}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                    />
                }

               <Text>Time</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(Time) => this.setState({ Time })}
                    value={this.state.Time}

                />

                <Text>Description</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(Description) => this.setState({ Description })}
                    value={this.state.Description}

                />


                <Button
                    title="Add"
                    onPress={this.add}
                />

                <Button
                    title="My Family"
                    onPress={() => this.props.navigation.navigate('FamilyProfile', {user:this.state.UserID})}
                />
                <Button
                    title="My Friends"
                    onPress={() => this.props.navigation.navigate('FriendsProfile', {user:this.state.UserID})}
                    />


            </View>
        );
    }

}   