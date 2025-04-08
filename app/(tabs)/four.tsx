import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Four() {
  const [selectedDate, setSelectedDate] = useState('');
  const [glicemia, setGlicemia] = useState('');
  const [pressao, setPressao] = useState('');
  const [dataSalva, setDataSalva] = useState<{ [date: string]: { glicemia: string, pressao: string } }>({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    carregarDadosSalvos();
  }, []);

  const carregarDadosSalvos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@dados_diarios');
      if (jsonValue) {
        setDataSalva(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Erro ao carregar dados:', e);
    }
  };

  const salvarDados = async () => {
    const novosDados = {
      ...dataSalva,
      [selectedDate]: {
        glicemia,
        pressao,
      }
    };
    setDataSalva(novosDados);
    setModalVisible(false);

    try {
      const jsonValue = JSON.stringify(novosDados);
      await AsyncStorage.setItem('@dados_diarios', jsonValue);
    } catch (e) {
      console.log('Erro ao salvar dados:', e);
    }
  };

  const abrirModal = (day: string) => {
    setSelectedDate(day);
    setGlicemia(dataSalva[day]?.glicemia || '');
    setPressao(dataSalva[day]?.pressao || '');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: string; }) => abrirModal(day.dateString)}
        markedDates={{
          ...Object.keys(dataSalva).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: 'blue' };
            return acc;
          }, {} as any),
          [selectedDate]: { selected: true, selectedColor: 'orange' },
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <Text style={styles.title}>Dados para {selectedDate}</Text>
          <TextInput
            style={styles.input}
            placeholder="Glicemia"
            keyboardType="numeric"
            value={glicemia}
            onChangeText={setGlicemia}
          />
          <TextInput
            style={styles.input}
            placeholder="Pressão Arterial"
            keyboardType="numeric"
            value={pressao}
            onChangeText={setPressao}
          />
          <Button title="Salvar" onPress={salvarDados} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  modal: {
    marginTop: 100,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
  },
});


