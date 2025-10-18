import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
