import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import imageBaixo from '../../assets/images/image3.png';
import bannerImage from '../../assets/images/sustentabilidade-og.webp';

const FEI_COORDS = {
  latitude: -23.7371,
  longitude: -46.5856,
  latitudeDelta: 0.01,  
  longitudeDelta: 0.01, 
};


export default class Home extends React.Component {
  render() {
    const dataLocal = new Date().toLocaleDateString();
    return (
      
      <ScrollView style={styleHome.container}>
        <ImageBackground
          source={bannerImage}
          style={styleHome.banner}
        >
          <Text style={styleHome.title}>EcoCrédito</Text>
          <Text style={styleHome.subt}>Programa de Reciclagem e Sustentabilidade</Text>
        </ImageBackground>

        <View style={styleHome.card}>
          <Text style={styleHome.text}>Sobre Nós</Text>
          <Text style={styleHome.cardText}>
            <Text>Somos um programa de incentivo à reciclagem e à sustentabilidade, promovendo a conscientização ambiental</Text>
            <Text>através de créditos de reciclagem. Nossa missão é transformar resíduos em benefícios para as empresas.</Text>
            <Text>Assim podemos associar a sustentabilidade com a economia, e tornar o mundo cada vez mais sustentável.</Text>
            <Text>#VemSerUmDeNós</Text>
            <Text>{dataLocal}</Text>
          </Text>
        </View>
        
        <View style={styleHome.botao}>
          <TouchableOpacity
            style={styleHome.botaoC}
            onPress={() => this.props.navigation.navigate("Welcome")}
          >
            <Text style={styleHome.txtBotaoC}>Ir para Login/Cadastro</Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
            source={imageBaixo}
            style={styleHome.banner}
          >
            <Text style={styleHome.title}>Nossa Localização</Text>
        <View style={styleHome.mapWrapper}>
            </View>
          </ImageBackground>

        <MapView
          style={styleHome.mapStyle}
          initialRegion={FEI_COORDS}
          showsUserLocation={true}     
          showsCompass={true}       
          zoomEnabled={true}           
          scrollEnabled={true}          
        >
          <Marker 
          coordinate={FEI_COORDS} 
          title="Centro Universitário FEI"
          description="Av. Humberto de Alencar Castelo Branco, 3972 - São Bernardo do Campo"
          />
        </MapView>
      </ScrollView>
    );
  }
}

const styleHome = StyleSheet.create({
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
    width: "100%",
    height: 150,
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

  mapWrapper: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
  },

  mapStyle: {
    paddingTop: 200,
    width: "100%",
    height: "100%",
  },
});
