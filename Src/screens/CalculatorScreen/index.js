import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/constants/Constants';
import axios from 'axios';
import { Toaster } from '../../components';

export const CalculatorScreen = () => {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('add');
  const [result, setResult] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false)



  const calculateResult = async () => {

    if (!num1 || !num2 || !operator) {
      Toaster({
        Title: "Error",
        description: "All Inputs are Required",
        type: "danger",
      })
    } else {


      setLoading(true)
      try {
        const requestBody = {
          val1: parseFloat(num1),
          val2: parseFloat(num2),
          method: operator,
        };


        const response = await axios.post('https://nordstone.onrender.com/api/calculate', requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setResult(response.data.result);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error calculating result:', error);
      }
    };

  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectOperator = (selectedOperator) => {
    setOperator(selectedOperator);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      {loading &&
        <View style={{ width: windowWidth, height: windowHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 5 }}>Please Wait...</Text>
        </View>
      }

      <Text style={{fontFamily: 'Piazzolla-Bold', fontSize: 32, color: '#0098D9', letterSpacing: 1, alignSelf: 'center', marginTop: 10}}>Welcome</Text>
      <Text style={[styles.labelStyling, { color: '#B9BABD', alignSelf: 'center', marginVertical: 10 }]}>Calculate Values here..!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter number 1"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter number 2"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={toggleOptions} style={styles.dropdownButton}>
        <Text>Select operator: {operator}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => selectOperator('add')} style={styles.optionButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectOperator('sub')} style={styles.optionButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectOperator('mul')} style={styles.optionButton}>
            <Text>*</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={calculateResult} style={styles.calculateButton}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Result: {result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dropdownButton: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  optionsContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 10,
    width: 40,
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
  },
});


