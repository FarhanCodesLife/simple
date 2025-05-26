import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [price, setPrice] = useState('');
  const [percentValue1, setpercentValue1] = useState('');
  const [percentValue2, setpercentValue2] = useState('');

  const [advanceValue1, setadvanceValue1] = useState('');
  const [advanceValue2, setadvanceValue2] = useState('');

  const [results, setResults] = useState({
    months: '',
    total: '',
    advance: '',
    daily: '',
    monthly: '',
    weekly: '',
  });

  const getMonthCountShort = (amount:number) => {
    if (amount < 3600) return 1;
    if (amount < 9700) return 2;
    if (amount < 18600) return 3;
    if (amount < 29700) return 4;
    if (amount < 43200) return 5;
    return 6;
  };

  const getMonthCountLong = (amount:number) => {
    if (amount < 3900) return 2;
    if (amount < 11000) return 4;
    if (amount < 22000) return 6;
    if (amount < 35000) return 8;
    if (amount < 51000) return 10;
    return 12;
  };

  const calculateShortTimePlan = () => {
    const cashPrice = parseFloat(price) || 0;
    const percent1 = parseFloat(percentValue1) || 22; // Fixed for Short Time Plan 22
    const advance1 = parseFloat(advanceValue1) || 2.5; // Fixed for Short Time Plan 2.5

    const totalPrice = cashPrice * (1 + percent1 / 100);
    const advanceAmount = totalPrice / advance1;
    const monthCount = getMonthCountShort(totalPrice);
    const dailyPayment = (totalPrice - advanceAmount) / monthCount / 30 + 50;
    const monthlyPayment = (totalPrice - advanceAmount) / monthCount;
    const weeklyPayment = (monthlyPayment / 4);

    setResults({
      months: `${monthCount} Months`,
      total: totalPrice.toFixed(0),
      advance: advanceAmount.toFixed(0),
      daily: dailyPayment.toFixed(0),
      monthly: monthlyPayment.toFixed(0),
      weekly: weeklyPayment.toFixed(0),
    });
  };

  const calculateLongTimePlan = () => {
    const cashPrice = parseFloat(price) || 0;
    const percent2 = parseFloat(percentValue2) || 44; // Fixed for Short Time Plan 22
    const advance2 = parseFloat(advanceValue2) || 4.5; // Fixed for Short Time Plan 2.5

    const totalPrice = cashPrice * (1 + percent2 / 100);
    const advanceAmount = totalPrice / advance2;
    const monthCount = getMonthCountLong(totalPrice);
    const dailyPayment = (totalPrice - advanceAmount) / monthCount / 30 + 50;
    const monthlyPayment = (totalPrice - advanceAmount) / monthCount;
    const weeklyPayment = (monthlyPayment / 4);

    setResults({
      months: `${monthCount} Months`,
      total: totalPrice.toFixed(0),
      advance: advanceAmount.toFixed(0),
      daily: dailyPayment.toFixed(0),
      monthly: monthlyPayment.toFixed(0),
      weekly: weeklyPayment.toFixed(0),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Instalment Plans</Text>

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

      <View style={styles.inputContainer}>
        <Text style={styles.labelshort}>Percent Short Time</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter percent 22"
          value={percentValue1}
          onChangeText={setpercentValue1}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labellong}>Percent Long Time</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter percent 44"
          value={percentValue2}
          onChangeText={setpercentValue2}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelshort}>Advance Short Time%</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Advance  2.5"
          value={advanceValue1}
          onChangeText={setadvanceValue1}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labellong}>Advance Long Time%</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Advance  4.5"
          value={advanceValue2}
          onChangeText={setadvanceValue2}
        />
      </View>


      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.planButtonshort} onPress={calculateShortTimePlan}>
          <Text style={styles.planButtonText}>Short Time Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.planButtonlong} onPress={calculateLongTimePlan}>
          <Text style={styles.planButtonText}>Long Time Plan</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.resultsContainer}>
  <Text style={styles.resultsHeader}>Cash Price   {price}</Text>

  <Text style={styles.logoname}>Ummat Electronics & Traders</Text>
  <Text style={styles.logoname}>(03128780897)</Text>

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
      <Text style={styles.resultLabel}>Monthly Payment:</Text>
      <Text style={styles.resultValue}>{results.monthly}</Text>
    </View>
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Weekly Payment:</Text>
      <Text style={styles.resultValue}>{results.weekly}</Text>
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
  labelshort: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'red',
  },
  labellong: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#28a745',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  planButtonshort: {
    flex: 1,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  planButtonlong: {
    flex: 1,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  planButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
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
    logoname: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
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
