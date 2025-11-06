import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from "react-native";
import { Card } from 'react-native-paper';
import firebase from "../config/firebase.js";

export default class Registro extends React.Component {
  constructor(props){
    super(props);
    this.tipo = ""
    this.tonelada = 0
    this.cod_descarte = ""
  }

  // funcao responsavel por verificar se o codigo da reciclagem ja existe ao user logado, e assim calcula com base nas toneladas o credito que o user receber
  gerarCredito = async (tipo) => {
    if (!this.cod_descarte || this.cod_descarte.length !== 10) {
      Vibration.vibrate(300);
      alert("O código da reciclagem deve ter 10 caracteres.");
      return;
    }

    if (!this.tonelada || this.tonelada <= 0) {
      Vibration.vibrate(300);
      alert("Informe uma quantidade válida de toneladas.");
      return;
    }

    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
      alert("Nenhum usuário logado encontrado!");
      return;
    }

    const valores = {
      "Madeira": 50,
      "Plastico": 80,
      "Derivados de Borracha": 100,
      "Materiais de Construção": 60,
      "Metais": 120,
      "Contaminados": 30
    };

    const valorPorTonelada = valores[tipo] || 0;
    const credito = this.tonelada * valorPorTonelada;

    try {
      const ref = firebase.database().ref(`/creditos/${usuarioLogado}`);
      const snapshot = await ref.orderByChild("codigo").equalTo(this.cod_descarte).once("value");

      if (snapshot.exists()) {
        alert("Esse código de reciclagem já foi usado!");
        return;
      }

      await ref.push({
        tipo,
        codigo: this.cod_descarte,
        toneladas: this.tonelada,
        credito,
        data: new Date().toISOString()
      });

      Vibration.vibrate(150);
      Vibration.vibrate(150);
      alert(`Crédito de ${credito.toFixed(2)} adicionado`);

    } catch (error) {
      console.log("Erro ao gerar crédito:", error);
      alert("Erro ao registrar o crédito. Tente novamente.");
    }
  };

  render() {
    return (
      <ScrollView>

        <Text style={stylesRegitro.titulo}>Registro de Reciclados</Text>

        <View style={stylesRegitro.container}>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Madeira"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem da madeira é crucial para a sustentabilidade ambiental, pois contribui diretamente para a preservação dos recursos naturais, a redução do desmatamento e a mitigação das mudanças climáticas. '}</Text>
              </Card.Content>
              <Text> </Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Madeira")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Plástico"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem do plástico é crucial para o meio ambiente, a economia e a sociedade, pois reduz a poluição ao diminuir o descarte em aterros e oceanos, economiza recursos naturais (como petróleo e energia)'}</Text>
              </Card.Content>
              <Text></Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Plastico")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>
          
            <Card style={stylesRegitro.card}> 
              <Card.Title title="Derivados de Borracha"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de derivados de borracha, especialmente de pneus, é crucial por razões ambientais e econômicas, transformando um resíduo de difícil degradação em matéria-prima valiosa. '}</Text>
              </Card.Content>
              <Text></Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Derivados de Borracha")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>
            <Card style={stylesRegitro.card}>
              <Card.Title title="Materiais de Construção"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de materiais de construção é vital para a sustentabilidade ambiental e econômica do setor. Ela reduz a extração de matérias-primas virgens e a quantidade de resíduos em aterros, preservando recursos naturais e ecossistemas'}</Text>
              </Card.Content>
              <Text></Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Materiais de Construção")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>
          

          
            <Card style={stylesRegitro.card}>
              <Card.Title title="Metais"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de metais é crucial para a sustentabilidade ambiental, pois reduz drasticamente a necessidade de mineração e o consumo de energia. Economicamente, impulsionando a economia circular..'}</Text>
              </Card.Content>
              <Text></Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Metais")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Contaminados"/>
              <Card.Content>
                <Text variant="bodyMedium">{'O descarte correto de resíduos contaminados é fundamental para proteger a saúde pública e preservar o meio ambiente, prevenindo a propagação de doenças e a contaminação do solo e da água.'}</Text>
              </Card.Content>
              <Text></Text>
              <View style={stylesRegitro.blocksInput}>
                <View>
                  <TextInput style={stylesRegitro.input} 
                    placeholder="Código da Reciclagem"
                    onChangeText={(texto)=>{this.cod_descarte = texto}}
                  />

                  <TextInput style={stylesRegitro.input} 
                    placeholder="Toneladas"
                    keyboardType="numeric"
                    onChangeText={(texto)=>{ this.tonelada = parseFloat(texto) }}
                  />
                </View>
                <TouchableOpacity style={stylesRegitro.botaoC} onPress={() => this.gerarCredito("Contaminados")}>
                  <Text style={stylesRegitro.txtBotaoC}>Creditar</Text>
                </TouchableOpacity>
              </View>
            </Card>
        </View>
      </ScrollView >
    );
  }
}

const stylesRegitro = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
  },

  card: { 
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    width: '90%',
    alignItems: "center",
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  text: { 
    color: "#000", 
    fontSize: 16, 
    textAlign: "center",
  },

  blocksInput: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: 220,
  },

  botaoC: {
    backgroundColor: '#01b0d3', 
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 30,
    alignSelf: 'center',
    paddingRight: 15,
  },

  txtBotaoC: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 30,
    color: '#005f73',
    backgroundColor: '#e0f2f1',
  },
});
