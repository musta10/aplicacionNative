import React, {useEffect} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import useForm from "../hooks/useForm";
const RegisterScreen = ({ navigation }) => {
  // const signUp = async () => {
  //   const res = await fetch('http://10.0.2.2:4000/signup', {method: 'POST', headers: {'Content-Type': 'application/json'}})
  //   const data = await res.json()
  //   console.log(data);

  // }
  // useEffect(() =>{
  //   signUp();
  // }, [])
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    fetch('http://10.0.2.2:4000/api/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values),
    })
    .then(x => x.text())
    .then(x => {
      if(x === 'éxito') {
        return Alert.alert( x, 'ya puedes conectarte', [
          {text: 'ir al inicio', onPress: () => navigation.navigate('Login')}
        ])
      }
      Alert.alert(
        'error',
        x,
      )
    })
  };
  const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>crea tu cuenta</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Usuario</Text>
        <TextInput
          value={inputs.username}
          onChangeText={subscribe("username")}
          style={styles.textInput}
          placeholder="Tu Nombre De Usuario"
          autoCapitalize="none"
        />
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
        <TextInput
          value={inputs.email}
          onChangeText={subscribe("email")}
          style={styles.textInput}
          placeholder="Tu Correo-Electrónico"
          autoCapitalize="none"
        />
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Contraseña</Text>
        <TextInput
          value={inputs.password}
          onChangeText={subscribe("password")}
          style={styles.textInput}
          placeholder="Tu Contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.boton_touch}
            onPress={handleSubmit}
          >
            <Text style={styles.textButton}>Regístrate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.boton_touch}
          >
            <Text style={styles.textButton}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    margin: 40,
  },
  boton_touch: {
    width: "100%",
    backgroundColor: "#F0C419",
    color: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default RegisterScreen;
