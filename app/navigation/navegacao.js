import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';

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
          <Stack.Screen name="Welcome" component={TabsUser} />
          <Stack.Screen name="Bem-Estar" component={TabsPages} />
        </Stack.Navigator>
    );
  }
}


//navegador durante login e cadastro
class TabsUser extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="Login" 
            component={Login} 
            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="log-in" size={size} color={color} />),}}
          />
          <Tab.Screen 
            name="Cadastro" 
            component={Cadastro} 
            options={{tabBarIcon: ({ color, size }) => (<Ionicons name="person-add" size={size} color={color} />),}}
          />
        </Tab.Navigator>
    );
  }
}

// navegador para pos login
class TabsPages extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="Registro" 
            component={Registro} 
            options={{tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />}}
          />
          <Tab.Screen 
            name="Extrato" 
            component={Extrato}
            options={{tabBarIcon: ({ color, size }) => <Ionicons name="wallet" size={size} color={color} />}} 
          />
          <Tab.Screen 
            name="EcoCrédito" 
            component={Imposto} 
            options={{tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} />}}
          />
            
          <Tab.Screen 
            name="Perfil" 
            component={Perfil} 
            options={{tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />}}
          />
        </Tab.Navigator>
    );
  }
}

