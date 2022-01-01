import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";


const HomeScreen = () => {
  const auth = null
  return (
    <SafeAreaView>
      {auth ? <Text>panel del usuario</Text> : <Text>formulario de login</Text>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
 
  
});

export default HomeScreen;
