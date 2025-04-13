import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day: { dateString: string; }) => abrirModal(day.dateString)}
            markedDates={{
              ...Object.keys(dataSalva).reduce((acc, date) => {
                acc[date] = { marked: true, dotColor: 'blue' };
                return acc;
              }, {} as any),
              [selectedDate]: { selected: true, selectedColor: 'orange' },
            }}
            style={{ width: 320 }}
          />
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
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
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  calendarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});


