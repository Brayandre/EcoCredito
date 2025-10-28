import * as React from 'react';
import { Alert, TextInput, Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const logCerto = "Brayan";
const senCerto = 123;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      senha: "",
    };
  }

  testLogin = () => {
    const { login, senha } = this.state;

    if (login === logCerto && parseInt(senha) === senCerto) {
      console.log("CERTO")
      // this.props.navigation.navigate("Filmes");
    } else {
      Alert.alert("Dados incorretos");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          onChangeText={(text) => this.setState({ login: text })}
        />
        <Text style={styles.title}>Senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => this.setState({ senha: text })}
        />
        <Button title="Entrar" onPress={this.testLogin} />
        <View style={{ marginTop: 20 }}>
          <Button
            title="Ir para Cadastro"
            onPress={() => this.props.navigation.navigate("Cadastro")}
          />
        </View>
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
