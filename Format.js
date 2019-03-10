import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler } from 'react-native';

export default class Format extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {
      const{firstName}=this.props.navigation.state.params;
      
    }

        render() {
      

        return (
            <View style={stayles.container}>
            
            <Text style={stayles.txt}>Hello {firstName}</Text>
            </View>

        );
    }
}

const stayles= StyleSheet.create({
    
        container: 
        {
            flex : 1,
            justifyContent : 'center',
            alignItems: 'center',
           
        },
      
        txt:
        {
            color: 'gray',
            fontSize: 35
        }
    })
    
    
    