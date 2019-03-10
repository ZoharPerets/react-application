import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, BackHandler,TouchableWithoutFeedback,TouchableOpacity,Touchable } from 'react-native';
//import { ThemeProvider, Button as SmallButton } from 'react-native-material-ui';
//import Format from '../components/Format';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        //<TouchableQpacity style={stayles.button}  onPress={() => this.props.navigation.navigate('Login')}>
        
                         // </TouchableQpacity>
        
    }
   
    signUp=()=>
    {
        this.props.navigation.navigate('SignUp')
    }
    login=()=>
    {
        this.props.navigation.navigate('Login')
    }
    render() {
        

        return (
     <View>
            <View >
           
         
            <Button title='My Acount' 
                onPress={() =>   this.props.navigation.navigate('Login')}
            />

            <Button title='New Acount' 
            onPress={() =>  this.props.navigation.navigate('SignUp')}
        />
            </View>
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
        marginLeft: 20,
        marginRight:20
    },
    button:
    {
       width: 70,
       height: 50,
       alignItems: 'center',
       justifyContent : 'center',
       
    },
    btn1:
    {
        width: 200,
        height: 60,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: 'rgb(0, 230, 172)',
        borderColor: 'rgb(0, 230, 172)',
        borderRadius: 90,
        bottom:20,right:20,


    },
    btn2:
    {
        width: 200,
        height: 60,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: 'rgb(0, 230, 172)',
        borderColor: 'rgb(0, 230, 172)',
        borderRadius: 90,
        bottom:20,left:20,


    },
    txt:
    {
        color: 'gray',
        fontSize: 20
    }
})


