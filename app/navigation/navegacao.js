import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import Login from "../init/login";
import Cadastro from "../init/cadastro";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default class Navegacao extends React.Component {
  render() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tabs" component={TabsUser} />
        </Stack.Navigator>
    );
  }
}

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

