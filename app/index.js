import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import NavegacaoInt from "./navigation/navegacao";

export default class Home extends React.Component {
  render() {
    return (
      <NavegacaoInt/>
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
