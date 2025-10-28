import * as React from "react";
import { TextInput, Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CadastroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
    };
  }

  cadastrar = () => {
    const { usuario, senha } = this.state;
    if (usuario && senha) {
      Alert.alert("Sucesso", `Usuário ${usuario} cadastrado!`);
    } else {
      Alert.alert("Erro", "Preencha todos os campos!");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          onChangeText={(text) => this.setState({ usuario: text })}
        />
        <Text style={styles.title}>Cadastrar Senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => this.setState({ senha: text })}
        />
        <Button title="CADASTRAR" onPress={this.cadastrar} />
      </View>
    );
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
