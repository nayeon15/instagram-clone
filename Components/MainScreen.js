import React, {Component} from 'react';
import { StyleSheet, Platform } from "react-native";
import { styles, system } from 'styled-system';

export default class MainScreen extends Comment{
    static navigationOptions = {
        headerLeft: <Icon name='android-camera' style={{paddingLeft:10}}/>,
        title:"Instagram",
        headerRight: <Icon name='android-send' style={{paddingRight:10}}/>,
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>MainScreen</Text>
            </View>
        );
    }

}


const styles = StryleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'Center',
    },
});