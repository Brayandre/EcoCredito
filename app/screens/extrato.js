import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase.js";

export default class Extrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extratos: [],
      loading: true,
    };
  }

  // puxa doa async o user logado
  async componentDidMount() {
    try {
      const usuario = await AsyncStorage.getItem("usuarioLogado");

      if (!usuario) {
        this.setState({ loading: false });
        alert("Nenhum usuário logado encontrado!");
        return;
      }

      this.setState({ usuario });
      this.carregarExtratos(usuario);
    } catch (error) {
      console.log("Erro ao buscar usuário logado:", error);
      this.setState({ loading: false });
    }
  }

  //busca o dados do user
  carregarExtratos(usuario) {
    const ref = firebase
      .database()
      .ref("/creditos")
      .child(usuario);

    this.listener = ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        this.setState({ extratos: lista.reverse(), loading: false });
      } else {
        this.setState({ extratos: [], loading: false });
      }
    });
  }

  // fica constantemente puxando as info do firebase pra listar imediatamente
  componentWillUnmount() {
    if (this.listener) {
      firebase.database().ref("/registros").off("value", this.listener);
    }
  }

  render() {
    const { extratos, loading, usuario } = this.state;

    if (loading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#0a9396" />
          <Text style={{ marginTop: 10 }}>Carregando extrato...</Text>
        </View>
      );
    }

    if (!usuario) {
      return (
        <View style={styles.container}>
          <Text style={styles.alertText}>Usuário não informado.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Extrato de Reciclagens</Text>

        {extratos.length === 0 ? (
          <Text style={styles.alertText}>Nenhum registro encontrado.</Text>
        ) : (
          <FlatList
            data={extratos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Código: {item.codigo}</Text>
                <Text>Material: {item.tipo}</Text>
                <Text>Toneladas: {item.toneladas}</Text>
                <Text>Crédito: {item.credito} pts</Text>
                <Text style={styles.dataTxt}>{item.data}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    padding: 16,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005f73',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0a9396',
    marginBottom: 5,
  },
  alertText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
    fontSize: 16,
  },
  dataTxt: {
    color: '#888',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'right',
  },
});