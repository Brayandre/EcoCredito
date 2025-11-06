import React from "react";
import { View, Text, Button, StyleSheet, Platform  } from "react-native";
import showAlert from "../components/alert.js"
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import firebase from "../config/firebase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      creditos: 0,
      logado: true,
      percentual: 0,
    };
  }

  async componentDidMount() {
    await this.carregarCreditos();
  }

  //CALCULA O PERCENTUAL CONFORME A QUANTIDADE DE CREDITOS USADOS
  calcularPercentual(creditos) {
    if (creditos >= 100000) return 10;
    if (creditos >= 75000) return 7;
    if (creditos >= 65000) return 5;
    if (creditos >= 55000) return 4;
    if (creditos >= 45000) return 3;
    if (creditos >= 35000) return 2;
    if (creditos >= 25000) return 1.5;
    if (creditos >= 15000) return 1;
    if (creditos >= 5000) return 0.5;
    return 0;
  }

  //BUSCA O USER LOGADO, PEGA O CREDITO DO FIREBASE E CALCULA O PERCENTUAL DE CREDITO
async carregarCreditos() {
  const usuario = await AsyncStorage.getItem("usuarioLogado");
  if (!usuario) {
    this.setState({ logado: false });
    showAlert("Erro", "Nenhum usuário logado encontrado!");
    return;
  }

  const ref = firebase.database().ref(`/creditos/${usuario}`);

  this.listener = ref.on("value", (snapshot) => {
    const data = snapshot.val();
    let total = 0;

    if (data) {
      Object.values(data).forEach((item) => {
        total += item.credito || 0;
      });
    }

    const percentual = this.calcularPercentual(total);
    this.setState({ creditos: total, percentual, loading: false });
  });
}


  //GERA UM PDF FICTICIO COMO SE FOSSE UMA CARTA DE NAO APROVEITAMENTO DE IMPOSTOS
  async gerarPDF() {
    const { usuario, creditos, percentual } = this.state;

    if (percentual === 0) {
      showAlert("Créditos insuficientes", "Você precisa de pelo menos 5K de créditos para gerar uma isenção.");
      return;
    }

    let valorNecessario = 0;
  switch (percentual) {
    case 0.5: valorNecessario = 5000; break;
    case 1: valorNecessario = 15000; break;
    case 1.5: valorNecessario = 25000; break;
    case 2: valorNecessario = 35000; break;
    case 3: valorNecessario = 45000; break;
    case 4: valorNecessario = 55000; break;
    case 5: valorNecessario = 65000; break;
    case 7: valorNecessario = 75000; break;
    case 10: valorNecessario = 100000; break;
    default: valorNecessario = 0;
  }

  if (creditos < valorNecessario) {
    showAlert("Créditos insuficientes", `Você precisa de ${valorNecessario.toLocaleString()} pts para gerar ${percentual}% de isenção.`);
    return;
  }

  const novoSaldo = creditos - valorNecessario;

    const data = new Date().toLocaleDateString("pt-BR");

    const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial; padding: 40px; color: #333; }
          .titulo { text-align: center; color: #0a9396; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
          .bloco { margin: 20px 0; font-size: 16px; }
          .assinatura { text-align: right; margin-top: 40px; font-size: 14px; color: #666; }
          .rodape { text-align: center; font-size: 12px; color: #999; margin-top: 40px; }
          .valor { font-size: 18px; font-weight: bold; color: #005f73; }
        </style>
      </head>
      <body>
        <h1 class="titulo">Certificado de Isencao Bem-Estar-Viver</h1>
        <p>Concedemos ao usuario <strong>${usuario}</strong> o certificado como reconhecimento positivo obtido atraves do programa de reciclagem EcoCreditos.</p>

        <div class="bloco">
          <p>Creditos somados: <strong>${creditos.toLocaleString()} pts</strong></p>
          <p>Percentual de isencao gerado: <span class="valor">${percentual}%</span></p>
          <p>Data de emissao: ${data}</p>
        </div>

        <p class="assinatura">
          ___________________________<br>
          EcoCreditos Brasil<br>
          Departamento de Sustentabilidade - FEI<br>
          Ciencia da Computacao<br>
          By Brayan Andre da Costa
        </p>

        <p class="rodape">
          Documento digital emitido oficialmente. Uso restrito a fins de comprovacao de isencao fiscal ecologica.
        </p>
      </body>
      </html>
    `;


    try {
      const usuario = await AsyncStorage.getItem("usuarioLogado");
      if (!usuario) {
        return;
      }
      const ref = firebase.database().ref(`/creditos/${usuario}`);
      await ref.update({ saldo: novoSaldo });
      if (Platform.OS === "web") {
        // Gera um blob manualmente e abre no navegador
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        // Gera PDF e compartilha no app mobile
        const file = await Print.printToFileAsync({ html });
        if (file?.uri) {
          await Sharing.shareAsync(file.uri);
        } else {
          throw new Error("Arquivo PDF não gerado");
        }
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      showAlert("Erro", "Não foi possível gerar o PDF.");
    }
  }
  render() {
    const { loading, creditos, percentual } = this.state;

    if (loading) {
      return (
        <View style={stylesImposto.loadingContainer}>
          <Text>Carregando créditos...</Text>
        </View>
      );
    }

    return (
      <View style={stylesImposto.container}>
        <Text style={stylesImposto.title}>Isenção de Impostos</Text>
        <View style={stylesImposto.card}>
          <Text style={stylesImposto.label}>Créditos acumulados:</Text>
          <Text style={stylesImposto.value}>{creditos.toLocaleString()} pts</Text>

          <Text style={stylesImposto.label}>Percentual de isenção:</Text>
          <Text style={stylesImposto.percent}>{percentual}%</Text>

          <Button 
            title="Gere sua Isenção"
            style={stylesImposto.botton}
            onPress={() => this.gerarPDF()}
          />
        </View>

        <Text style={stylesImposto.info}>
          *Cada 5.000 créditos gera 0,5% de isenção, com limite de 10%.
        </Text>
      </View>
    );
  }
}

const stylesImposto = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2f1",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#005f73",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0a9396",
    marginBottom: 10,
  },
  percent: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005f73",
    marginBottom: 20,
  },
  info: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
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
    marginLeft: 10,     
  },
});