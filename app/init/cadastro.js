import * as React from "react";
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@react-navigation/elements";
import firebase from "../config/firebase.js";
import showAlert from "../components/alert.js"

export default class CadastrarUser extends React.Component{
  constructor(props){
    super(props);
    this.nome = ""
    this.user = ""
    this.senha = ""
    this.empresa = ""
    this.cnpj = 0
  }


  // salva dados no firebase, verificando se o usuario e o cnpj ja existem
  async salvar(){
      console.log("Função salvar() chamada");
      console.log("Dados digitados:", this.nome, this.user, this.senha, this.empresa, this.cnpj);
      if(!this.nome ||!this.user ||!this.senha ||!this.empresa ||!this.cnpj){
        showAlert("Atenção","Preencha todos os campos!");
        return;
      }

      try {
        const verifUser = await firebase.database().ref("/notebooks").orderByChild("user").equalTo(this.user).once("value")
        const verifCNPJ = await firebase.database().ref("/notebooks").orderByChild("cnpj").equalTo(this.cnpj).once("value")

        if (verifUser.exists() && verifCNPJ.exists()) {
          let userExiste = false;
          verifUser.forEach(child => {
            const dados = child.val();
            if (dados.senha === this.senha) {
              userExiste = true;
            }
          });

          if (userExiste) {
            showAlert("Atenção", "Usuário e senha já cadastrados!");
            return;
          }
        }

        await firebase.database().ref("/notebooks").push({
          nome: this.nome,
          user: this.user,
          senha: this.senha,
          empresa: this.empresa,
          cnpj: this.cnpj
        });
        showAlert("Sucesso", "Usuário cadastrado com sucesso!");
      } catch (error) {
      console.log("erro");
    }
  }

  render(){
    return(
      <View style={stylesCadastro.container}> 
        <Text style={stylesCadastro.title}>Cadastro</Text>
        <TextInput style={stylesCadastro.input} 
          placeholder="Nome"
          onChangeText={(texto)=>{this.nome = texto}}
        />
        <TextInput style={stylesCadastro.input} 
          placeholder="Login"
          onChangeText={(texto)=>{this.user = texto}}
        />
        <TextInput style={stylesCadastro.input} 
          placeholder="Senha"
          onChangeText={(texto)=>{this.senha = texto}}
        />
        <TextInput style={stylesCadastro.input} 
          placeholder="Empresa Associada"
          onChangeText={(texto)=>{this.empresa = texto}}
        />
        <TextInput style={stylesCadastro.input} 
          placeholder="CNPJ da Empresa"
          onChangeText={(texto)=>{this.cnpj = texto}}
        />
      <TouchableOpacity style={stylesCadastro.botao} onPress={() => this.salvar()}>
        <Text style={stylesCadastro.txtBotao}>Cadastrar</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const stylesCadastro = StyleSheet.create({
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
