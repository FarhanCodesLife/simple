import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('44');
  const [advance, setAdvance] = useState('4.5');
  const [results, setResults] = useState({
    months: '',
    total: '',
    advance: '',
    daily: '',
  });

  const getMonthCount = (amount:number) => {
    if (amount < 3900) return 1;
    if (amount < 11000) return 2;
    if (amount < 22000) return 3;
    if (amount < 35000) return 4;
    if (amount < 51000) return 5;
    return 6;
  };

  const calculatePlan = () => {
    const cashPrice = parseFloat(price) || 0;
    const percentValue = parseFloat(percent) || 44;
    const advanceValue = parseFloat(advance) || 4.5;

    const totalPrice = cashPrice * (1 + percentValue / 100);
    const advanceAmount = totalPrice / advanceValue / 2;
    const monthCount = getMonthCount(totalPrice);
    const dailyPayment = (totalPrice - advanceAmount) / monthCount / 30;

    setResults({
      months: `${monthCount} Months`,
      total: totalPrice.toFixed(0),
      advance: advanceAmount.toFixed(0),
      daily: dailyPayment.toFixed(0),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Shopkeeper Plan</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cash Price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Cash Price"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      

    

      <TouchableOpacity style={styles.button} onPress={calculatePlan}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      <View style={styles.resultsContainer}>
      <Text style={styles.resultsHeader}>Cash Price {price}</Text>

<Text style={styles.logoname}>Ummat Electronics & Traders (03128780897)</Text>

<Text style={styles.resultsHeader}>Installment Payment</Text>
  <View style={styles.resultCard}>
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Months:</Text>
      <Text style={styles.resultValue}>{results.months}</Text>
    </View>
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Total Price:</Text>
      <Text style={styles.resultValue}>{results.total}</Text>
    </View>
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Advance:</Text>
      <Text style={styles.resultValue}>{results.advance}</Text>
    </View>
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Daily Payment:</Text>
      <Text style={styles.resultValue}>{results.daily}</Text>
    </View>
  </View>
</View>




    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  logoname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },


    resultsContainer: {
      marginTop: 30,
      width: '100%',
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#e6e6e6',
    },
    resultsHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4a90e2',
      marginBottom: 15,
      textAlign: 'center',
    },
    resultCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
    },
    resultLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
    },
    resultValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  
});
