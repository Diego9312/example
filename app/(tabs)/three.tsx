import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Afericao = {
  dataHora: string;
  glicemia: string;
  pressao: string;
};

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function WeeklyRegister() {
  const [registros, setRegistros] = useState<Record<string, Afericao[]>>({});
  const [glicemia, setGlicemia] = useState("");
  const [pressao, setPressao] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState(getDiaHoje());

  function getDiaHoje() {
    const diaIndex = new Date().getDay();
    return diasDaSemana[diaIndex];
  }

  useEffect(() => {
    AsyncStorage.getItem("afericoes").then((data) => {
      if (data) {
        setRegistros(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("afericoes", JSON.stringify(registros));
  }, [registros]);

  const adicionarAfericao = () => {
    if (!glicemia || !pressao) {
      Alert.alert("Preencha todos os campos.");
      return;
    }

    const novaAfericao: Afericao = {
      dataHora: new Date().toLocaleString("pt-BR"),
      glicemia,
      pressao,
    };

    setRegistros((prev) => {
      const afericoesDia = prev[diaSelecionado] || [];
      if (afericoesDia.length >= 10) {
        Alert.alert("Limite de 10 aferições atingido para o dia.");
        return prev;
      }
      return {
        ...prev,
        [diaSelecionado]: [...afericoesDia, novaAfericao],
      };
    });

    setGlicemia("");
    setPressao("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro Semanal de Aferições</Text>

      <View style={styles.diasContainer}>
        {diasDaSemana.map((dia) => (
          <TouchableOpacity
            key={dia}
            style={[
              styles.diaBotao,
              dia === diaSelecionado && styles.diaSelecionado,
            ]}
            onPress={() => setDiaSelecionado(dia)}
          >
            <Text
              style={[
                styles.diaTexto,
                dia === diaSelecionado && styles.diaTextoSelecionado,
              ]}
            >
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Glicemia (ex: 100)"
        keyboardType="numeric"
        value={glicemia}
        onChangeText={setGlicemia}
      />
      <TextInput
        style={styles.input}
        placeholder="Pressão arterial (ex: 12.0/8.0)"
        value={pressao}
        onChangeText={setPressao}
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarAfericao}>
        <Text style={styles.botaoTexto}>Salvar Aferição</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Aferições de {diaSelecionado}:</Text>
      {registros[diaSelecionado]?.length ? (
        <FlatList
          data={registros[diaSelecionado]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.afericaoItem}>
              <Text style={styles.afericaoTexto}>📅 {item.dataHora}</Text>
              <Text style={styles.afericaoTexto}>🩸 Glicemia: {item.glicemia}</Text>
              <Text style={styles.afericaoTexto}>💓 Pressão: {item.pressao}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ marginTop: 10, fontStyle: "italic" }}>
          Nenhuma aferição registrada ainda.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F5F5F5",
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  diasContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  diaBotao: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    margin: 4,
  },
  diaSelecionado: {
    backgroundColor: "#4CAF50", // VERDE
  },
  diaTexto: {
    fontSize: 16,
    color: "#333",
  },
  diaTextoSelecionado: {
    color: "#FFF",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#4CAF50", // VERDE
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  afericaoItem: {
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50", // VERDE
  },
  afericaoTexto: {
    fontSize: 15,
    marginBottom: 4,
  },
});



