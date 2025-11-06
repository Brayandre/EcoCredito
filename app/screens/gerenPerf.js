import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase";

export default function Perfil() {
  const [usuarioData, setUsuarioData] = useState({});
  const [extrato, setExtrato] = useState([]);
  const [totalToneladas, setTotalToneladas] = useState(0);
  const [totalCreditos, setTotalCreditos] = useState(0);
  const [loading, setLoading] = useState(true);
  
  
// puxa todos os dados do firebase a partir da entrada na pagina
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
          alert("Nenhum usuário logado encontrado!");
          setLoading(false);
          return;
        }

        const userRef = firebase.database().ref("/notebooks").orderByChild("user").equalTo(usuarioLogado);
        userRef.once("value", (snapshot) => {
          let data = {};
          snapshot.forEach((child) => {
            data = child.val();
          });
          setUsuarioData(data);
        });

        const ref = firebase.database().ref(`/creditos/${usuarioLogado}`);
        ref.on("value", (snapshot) => {
          const data = [];
          let totalT = 0;
          let totalC = 0;
          snapshot.forEach((child) => {
            const item = child.val();
            data.push(item);
            totalT += item.toneladas || 0;
            totalC += item.credito || 0;
          });
          setExtrato(data.reverse());
          setTotalToneladas(totalT);
          setTotalCreditos(totalC);
          setLoading(false);
        });

        return () => ref.off();

      } catch (error) {
        s("Erro ao carregar perfil.");
        setLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={stylesPerf.container}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={stylesPerf.container}>
      <Text style={stylesPerf.titulo}>Perfil do Usuário</Text>

      <View style={stylesPerf.card}>
        <Text style={stylesPerf.info}>Nome: {usuarioData.nome}</Text>
        <Text style={stylesPerf.info}>Usuário: {usuarioData.user}</Text>
        <Text style={stylesPerf.info}>Empresa: {usuarioData.empresa}</Text>
        <Text style={stylesPerf.info}>CNPJ: {usuarioData.cnpj}</Text>
        <Text style={stylesPerf.info}>Total de Créditos: {totalCreditos.toLocaleString()} pts</Text>
        <Text style={stylesPerf.info}>Total de Toneladas Recicladas: {totalToneladas.toFixed(2)} ton</Text>
      </View>

      <Text style={stylesPerf.subTitulo}>Reciclagem Efetuadas</Text>
      <FlatList
        data={extrato}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={stylesPerf.cardItem}>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Toneladas: {item.toneladas}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum crédito registrado ainda.</Text>}
      />
    </View>
  );
}

const stylesPerf = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e0f2f1', 
    padding: 20 
  },

  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#1B4332", 
    textAlign: "center", 
    marginBottom: 20 
  },
  
  info: { 
    fontWeight: "bold", 
  },

  subTitulo: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#2D6A4F", 
    marginTop: 15, 
    marginBottom: 10 
  },

  card: { 
    backgroundColor: "#ffffffff", 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 20 
  },

  cardItem: { 
    backgroundColor: "#FFF", 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 10 
  },
});
