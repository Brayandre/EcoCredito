import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>🚀 Olá! Expo Router está funcionando!</Text>
        <Link href="/login" style={styles.link}>Ir para Login</Link>
        <Link href="/cadastro" style={styles.link}>Ir para Cadastro</Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    color: "#1E90FF",
    fontSize: 18,
    marginVertical: 10,
  },
});
