import React from "react";
import { StyleSheet, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import Logo from "../assets/island.png";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: { backgroundColor: "#FFF" },
          headerLeft: () => <Image source={Logo} style={styles.imglogo} />,
          title: "Island",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        headerMode="none"
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  imglogo: {
    width: 37,
    height: 37,
    marginEnd: 25,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
