import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.container}>
      {/* Ícone de Estetoscópio */}
      <View style={styles.iconContainer}>
        <FontAwesome5 name="stethoscope" size={48} color="#216b2e" />
      </View>

      <Text style={styles.title}>Bem-vindo de volta</Text>

      {/* Campo de e-mail */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Campo de senha com botão de visualização */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarSenha}
          placeholderTextColor="#999"
        />
        <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
          <FontAwesome5 name={mostrarSenha ? 'eye-slash' : 'eye'} size={20} color="#216b2e" />
        </Pressable>
      </View>

      {/* Botão de login */}
      <Pressable style={styles.button} onPress={() => router.push('/(tabs)/two',)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      {/* Links de ajuda */}
      <View style={styles.linksContainer}>
        <Pressable onPress={() => alert('Recuperar senha')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </Pressable>
        <Text style={styles.separator}> | </Text>
        <Pressable onPress={() => alert('Ir para cadastro')}>
          <Text style={styles.link}>Cadastrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fdf6',
    padding: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#216b2e',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  inputSenha: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#216b2e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: '#216b2e',
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 8,
    color: '#999',
  },
});
