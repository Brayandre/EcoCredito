import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../init/home";
import Login from "../init/login";
import Cadastro from "../init/cadastro";
import Imposto from "../screens/imposto";
import Registro from "../screens/registro";
import Extrato from "../screens/extrato";
import Perfil from "../screens/gerenPerf";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//cria as telas de navegacao
export default class Navegacao extends React.Component {
  render() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tabs" component={TabsUser} />
          <Stack.Screen name="TabsAllPages" component={TabsPages} />
        </Stack.Navigator>
    );
  }
}


//navegador durante login e cadastro
class TabsUser extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Cadastro" component={Cadastro} />
        </Tab.Navigator>
    );
  }
}

// navegador para pos login
class TabsPages extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Registro" component={Registro} />
          <Tab.Screen name="Extrato" component={Extrato} />
          <Tab.Screen name="EcoCrédito" component={Imposto} />
          <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
  }
}

