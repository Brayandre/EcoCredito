import * as React from "react";
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@react-navigation/elements";
import firebase from "../config/firebase.js";
import showAlert from "../components/alert.js"

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.user = ""
    this.senha = ""
  }

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
            this.props.navigation.navigate("TabsAllPages");
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
      <View> 
        <TextInput style={styles.input} 
          placeholder="Login"
          onChangeText={(texto)=>{this.user = texto}}
        />
        <TextInput style={styles.input} 
          placeholder="Senha"
          onChangeText={(texto)=>{this.senha = texto}}
        />
      <TouchableOpacity style={styles.botao} onPress={() => this.testar()}>
        <Text style={styles.txtBotao}>Logar</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
