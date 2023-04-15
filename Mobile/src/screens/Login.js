import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setError('')

    try {
      const URI = 'http://localhost:5000'
      const { data } = await axios.post(
        `${URI}/auth/login`,
        { email, password }
      );
      await AsyncStorage.setItem("authToken", data.token);

      setTimeout(() => {

        navigation.navigate("Profile")

      }, 1800)


    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Bloger</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          value={password}
          secureTextEntry={true}
          style={styles.inputText}
          placeholder="Mật khẩu"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword} />
      </View>
      <Text style={styles.textError}>
        {error}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.forgot}>Tạo tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={loginHandler}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#0063a5",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#6971741a",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputText: {
    height: 50,
    color: "#0063a5"
  },
  forgot: {
    color: "#0063a5",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#0063a5",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  textError: {
    color: "red"
  }
});

export default Login;

