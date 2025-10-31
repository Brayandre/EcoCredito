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
      <View> 
        <TextInput style={styles.input} 
          placeholder="Nome"
          onChangeText={(texto)=>{this.nome = texto}}
        />
        <TextInput style={styles.input} 
          placeholder="Login"
          onChangeText={(texto)=>{this.user = texto}}
        />
        <TextInput style={styles.input} 
          placeholder="Senha"
          onChangeText={(texto)=>{this.senha = texto}}
        />
        <TextInput style={styles.input} 
          placeholder="Empresa Associada"
          onChangeText={(texto)=>{this.empresa = texto}}
        />
        <TextInput style={styles.input} 
          placeholder="CNPJ da Empresa"
          onChangeText={(texto)=>{this.cnpj = texto}}
        />
      <TouchableOpacity style={styles.botao} onPress={() => this.salvar()}>
        <Text style={styles.txtBotao}>Cadastrar</Text>
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
