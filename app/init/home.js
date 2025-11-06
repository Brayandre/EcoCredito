import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import bannerImage from '../../assets/images/sustentabilidade-og.webp';
// import MapView, { Marker } from 'react-native-maps';
import { Platform } from 'react-native';

const FEI_COORDS = {
  latitude: -23.693, 
  longitude: -46.557,
  latitudeDelta: 0.01,   // zoom vertical
  longitudeDelta: 0.01,  // zoom horizontal
};

export default class Home extends React.Component {
  render() {
    return (
      <ScrollView style={stylesRegitro.container}>
        {/* Banner / imagem de fundo */}
        <ImageBackground
          source={bannerImage}
          style={stylesRegitro.banner}
        >
          <Text style={stylesRegitro.title}>Bem-Estar Viver</Text>
          <Text style={stylesRegitro.subt}>Programa de Reciclagem e Sustentabilidade</Text>
        </ImageBackground>

        {/* Sobre Nós */}
        <View style={stylesRegitro.card}>
          <Text style={stylesRegitro.text}>Sobre Nós</Text>
          <Text style={stylesRegitro.cardText}>
            Somos um programa de incentivo à reciclagem e à sustentabilidade, promovendo a conscientização ambiental
            através de créditos de reciclagem. Nossa missão é transformar resíduos em benefícios para as empresas.
            Assim podemos associar a sustentabilidade com a economia, e tornar o mundo cada vez mais sustentável.
            {"\n"}{"\n"}<b>#VemSerUmDeNós</b>
          </Text>
        </View>

          <View style={stylesRegitro.card}>
            <Text style={stylesRegitro.text}>Nossa Localização</Text>
            <View style={stylesRegitro.mapWrapper}>
              {Platform.OS !== 'web' ? (
                <MapView
                  style={stylesRegitro.mapStyle}
                  initialRegion={FEI_COORDS}
                >
                  <Marker coordinate={FEI_COORDS} title="Centro Educacional FEI" />
                </MapView>
              ) 
              : (
                <Text>Mapa não disponível no Web</Text>
              )}
            </View>
          </View>

        <View style={stylesRegitro.botao}>
          <TouchableOpacity
            style={stylesRegitro.botaoC}
            onPress={() => this.props.navigation.navigate("Welcome")}
          >
            <Text style={stylesRegitro.txtBotaoC}>Ir para Login/Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const stylesRegitro = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#e0f2f1',
  },

  banner: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
    flex: 1,
    width: "100%",
    height: 250,
    justifyContent: "center"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#ffffffff',
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  subt: {
    fontSize: 16,
    color: '#ffffffff',
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  card: { 
    flex: 1,
    backgroundColor: "#f5f5f5ff", 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 0,
    elevation: 3, 
    height: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    position: 'relative',
    marginBottom: 20,
  },

  text: { 
    color: "#000", 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center",
  },

  cardText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  mapPlaceholder: {
    height: 200,
    backgroundColor: "#cfe8e6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  mapText: {
    color: "#555",
    fontSize: 16,
  },

  botao: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  botaoC: {
    backgroundColor: '#00a9caff', 
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
    position: 'relative',  
    top: -17,              
    left: -22,           
  },

  txtBotaoC: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
