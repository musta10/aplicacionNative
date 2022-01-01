import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import useForm from "../hooks/useForm"
const LoginScreen = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  }
  const onSubmit = values =>{
    fetch('http://10.0.2.2:4000/api/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values),
    })
    .then(x => x.text())
    .then(x => {
      try {
        return JSON.parse(x)
      } catch {
        throw x
      }
    })
    .then( x => {
      const storeData = (x) => {
        try {
          AsyncStorage.setItem('user', x)
        } catch (e) {
          console.log(e);
        }
      }
     navigation.navigate('Home')
    })
    .catch(e => Alert.alert('error', e))
  }
  const {subscribe, inputs, handleSubmit} = useForm(initialState, onSubmit)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>inicia sesión</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <TextInput
        value={inputs.email}
        onChangeText={subscribe('email')}
          style={styles.textInput}
          placeholder="Tu Correo-Electronico"
          autoCapitalize="none"
        />
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Contraseña</Text>
        <TextInput
        value={inputs.password}
        onChangeText={subscribe('password')}
          style={styles.textInput}
          placeholder="Tu Contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <View style={styles.buttons}>
          <TouchableOpacity  onPress={handleSubmit} style={styles.boton_touch}>
          <Text style={styles.textButton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 70, textAlign: "center"}}>No Tienes Una Cuenta</Text>
          <TouchableOpacity style={styles.boton_Acount} onPress={() => navigation.push("Register")}>
              <Text style={styles.textButton}>Regístrate</Text>
              </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0C419",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_footer: {
    color: "#2FA8CC",
    fontSize: 18,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "black",
  },
  buttons: {
    margin: 50
  },
  boton_touch: {
      width: '100%',
      backgroundColor: '#F0C419',
      color: "white",
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 10
  },
  boton_Acount:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  textButton: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black'
  }
});

export default LoginScreen;
