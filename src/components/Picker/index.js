import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';


export default function Picker(props){

    const placeholder = {
        label: 'Selecione o tipo de moeda:',
        value: null,
        color: '#000'
    }

    return(
        <RNPickerSelect
        placeholder={placeholder}
        items={props.moedas}
        onValueChange={ (value) => props.onChange(value)}
        style={{
            inputAndroid:{
                fontSize: 20,
                color: '#000'
            },
            inputIOS:{
                fontSize: 20,
                color: '#000'
            }
        }}
        />
    );
}

const styles = StyleSheet.create({
    item:{
        color: '#121212'
    }
});