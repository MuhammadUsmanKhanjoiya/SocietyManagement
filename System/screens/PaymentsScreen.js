import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function PaymentsScreen() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'payments'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const paymentsList = [];
        querySnapshot.forEach((doc) => {
          paymentsList.push({ id: doc.id, ...doc.data() });
        });
        setPayments(paymentsList);
      });

      return () => unsubscribe();
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text>Amount: ${item.amount}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>
      <FlatList
        data={payments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
