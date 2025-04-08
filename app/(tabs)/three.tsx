import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function WeeklyRegister() {
  const [dados, setDados] = useState(
    diasDaSemana.reduce((acc, dia) => {
      acc[dia] = { glicemia: "", pressao: "" };
      return acc;
    }, {} as Record<string, { glicemia: string; pressao: string }>)
  );

  const handleChange = (dia: string, campo: "glicemia" | "pressao", valor: string) => {
    setDados((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor,
      },
    }));
  };

  const salvarDados = async () => {
    const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    try {
      const registrosExistentes = JSON.parse((await AsyncStorage.getItem("registros")) || "{}");
      await AsyncStorage.setItem("registros", JSON.stringify({ ...registrosExistentes, [hoje]: dados }));
      Alert.alert("Sucesso", "Dados salvos com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registros Semanais</Text>
      {diasDaSemana.map((dia) => (
        <View key={dia} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{dia}</Text>
          <TextInput
            placeholder="Glicemia"
            style={styles.input}
            keyboardType="numeric"
            value={dados[dia].glicemia}
            onChangeText={(valor) => handleChange(dia, "glicemia", valor)}
          />
          <TextInput
            placeholder="Pressão"
            style={styles.input}
            keyboardType="numeric"
            value={dados[dia].pressao}
            onChangeText={(valor) => handleChange(dia, "pressao", valor)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={salvarDados}>
        <Text style={styles.buttonText}>Salvar Registros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
