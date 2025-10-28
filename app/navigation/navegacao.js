import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from "../init/login"
import Cadastro from "../init/cadastro"

const Tab = createBottomTabNavigator();

export default class Navegacao extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login}/>
        <Tab.Screen name="Cadastro" component={Cadastro}/>
      </Tab.Navigator>
    );
  }
}

