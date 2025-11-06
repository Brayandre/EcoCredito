import * as React from "react";
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@react-navigation/elements";
import firebase from "../config/firebase.js";
import showAlert from "../components/alert.js"

export default class Login extends React.Component{

  // verifica se os input estao dentro do database do firebase, login e senha deve aparecer
  async testar(){
      if(!this.user ||!this.senha){
        showAlert("Atenção","Preencha todos os campos!");
        return;
      }

      try {
        const verifUser = await firebase.database().ref("/notebooks").orderByChild("user").equalTo(this.user).once("value")

      if (verifUser.exists()) {
        let loginOk = false;
        verifUser.forEach(child => {
          const dados = child.val();
          if (dados.senha === this.senha) {
            loginOk = true;
            AsyncStorage.setItem("usuarioLogado", this.user);
            this.props.navigation.navigate("Bem-Estar");
          }
        });
        if (!loginOk) {
          showAlert("Atenção", "Senha incorreta!");
        }
      } else {
        showAlert("Atenção", "Usuário não encontrado!");
      }
      } catch (error) {
      console.log("erro");
    }
    
  }

  render(){
    return(
      <View style={stylesLogin.container}> 
      <Text style={stylesLogin.title}>Login</Text>
        <TextInput style={stylesLogin.input} 
          placeholder="Login"
          onChangeText={(texto)=>{this.user = texto}}
        />
        <TextInput style={stylesLogin.input} 
          placeholder="Senha"
          onChangeText={(texto)=>{this.senha = texto}}
        />
      <TouchableOpacity style={stylesLogin.botao} onPress={() => this.testar()}>
        <Text style={stylesLogin.txtBotao}>Logar</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const stylesLogin = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 20,
  paddingVertical: 30,
  backgroundColor: '#e0f2f1',
  },
  title: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      letterSpacing: 0.8,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      color: '#005f73',
      backgroundColor: '#e0f2f1',
  },

  input: {
      borderWidth: 1,
      borderColor: "#aaa",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 30,
      backgroundColor: "#fff",
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      width: '100%',
  },

  botao: {
      backgroundColor: '#3A7AFE',
      paddingVertical: 14,
      paddingHorizontal: 25,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 5,
      marginTop: 10,
  },

  txtBotao: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 0.5,
  },
});


