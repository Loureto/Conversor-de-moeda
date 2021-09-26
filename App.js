import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';

import Picker from './src/components/Picker';
import api from './src/services/api';

export default function App(){

  const [moeda, setMoeda] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorconvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadingMoeda(){
      const reponse = await api.get('all');

      let arrayMoeda = []
      Object.keys(reponse.data).map((key)=>{
        arrayMoeda.push({
          key: key,
          value: key,
          label: key
        })
      })

      setMoeda(arrayMoeda);
      setLoading(false);
    }


    loadingMoeda();

  },[]);

  async function converter(){
    if(moedaSelecionada === null || moedaBValor === 0){
      alert('Selecione o tipo de moeda ou informa o valor para ser convertido!');
      return;
    }

    const reponse = await api.get(`all/${moedaSelecionada}-BRL`);

    let resultado = (reponse.data[moedaSelecionada].ask * parseFloat(moedaBValor));

    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor);

    Keyboard.dismiss();
  }

  if(loading){
    return(
      <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
        <ActivityIndicator color='#FFF' size={45}/>
      </View>      
    );
    
  }else{
    return(
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda:</Text>
          <Picker moedas={moeda} onChange={ (moeda) => setMoedaSelecionada(moeda)}/>
        </View>
  
        <View style={styles.areaInput}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$):</Text>
          <TextInput 
          style={styles.input}
          placeholder="Ex: 150"
          keyboardType="numeric"
          onChangeText={(value) => setMoedaBValor(value)}
          name="inputMoeda"
          />
        </View>
  
        <TouchableOpacity style={styles.botao} onPress={converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>
        
        {valorconvertido !== 0 && (
          <View style={styles.areaTexto} >
            <Text style={[styles.titulo], {fontSize:50, fontWeight:'bold'}}>{valorMoeda} {moedaSelecionada}</Text>
            <Text style={[styles.titulo], {fontSize:25, fontWeight:'bold'}}>Corresponde a</Text>
            <Text style={[styles.titulo], {fontSize:50,fontWeight:'bold'}}>{valorconvertido}</Text>
          </View>    
        )}
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#101215',
    alignItems:'center',
    paddingTop: 40
  },
  areaMoeda:{
    width: '90%',
    backgroundColor:'#F9F9F9',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  titulo:{
    margin: 5,
    fontSize: 16,
    fontWeight:'300'
  },
  areaInput:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    marginTop: 2,
  },
  input:{
    width: '100%',
    height: 45,
    fontSize: 20,
    color: '#000',    
  },
  botao:{
    width: '90%',
    height: 50,
    backgroundColor: '#FB4b57',
    alignItems:'center',
    justifyContent:'center',
    borderBottomRightRadius: 9,
    borderBottomLeftRadius:9
  },
  botaoTexto:{
    fontSize:18,
    color: '#FFF',
    fontWeight:'bold',
  },
  areaTexto:{
    width:'90%',
    height: 300,
    backgroundColor:'#F9F9F9',
    marginTop: 40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 9
  },

});