import * as React from 'react';
import { TextInput, Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cadastro from './inicial/cadastro';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class Nav1 extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Navegacao1.Navigator>
          <Navegacao1.Screen
            name="Home"
            component={Nav2}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ), headerShown: false
            }}
          />
          <Navegacao1.Screen
            name="Cadastro"
            component={Tela2}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-details"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Navegacao1.Navigator>
      </NavigationContainer>
    );
  }
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: undefined
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          {/* Campo de digitação para login */}
          <Text>{"Usuário:"}</Text>
          <TextInput onChangeText={(texto) => this.setState({ usuario: texto })}></TextInput>
          <Text>{"Senha:"}</Text>
          <TextInput onChangeText={(texto) => this.setState({ senha: texto })}></TextInput>
          <Button title="Logar" onPress={() => this.ler()}></Button>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  // Faz a verificação do login para efetuar o redirecionamento
  async ler() {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario + "_senha");
      if (senha != null) {
        if (senha == this.state.senha) {
          alert("Logado!!!");
          this.props.navigation.navigate('Welcome', { usuario: this.state.usuario });
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  }
}