import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tela Inicial</Text>
        <Button
          title="Ir para Login/Cadastro"
          onPress={() => this.props.navigation.navigate("Tabs")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
