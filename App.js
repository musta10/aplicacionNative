import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./navigation/NavigationStack";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
