import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
 
export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();
 
  const handleRegister = () => {
    if (!name || !idade || !cpf || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    router.push('/'); // Navega para a página inicial ou outra tela desejada
  };
 
 
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo "
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
      />
       <TextInput
        style={styles.input}
        placeholder="cpf"
        value={cpf}
        onChangeText={setCpf}
      />
        <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    color: '#555',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  icon: {
    marginLeft: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
 
