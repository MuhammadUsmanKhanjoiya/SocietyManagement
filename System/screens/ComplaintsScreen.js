import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function ComplaintsScreen() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'complaints'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const complaintsList = [];
        querySnapshot.forEach((doc) => {
          complaintsList.push({ id: doc.id, ...doc.data() });
        });
        setComplaints(complaintsList);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleSubmitComplaint = async () => {
    const user = auth.currentUser;
    if (user && newComplaint.trim() !== '') {
      try {
        await addDoc(collection(db, 'complaints'), {
          userId: user.uid,
          title: newComplaint,
          status: 'Pending',
          createdAt: new Date(),
        });
        setNewComplaint('');
      } catch (error) {
        console.error('Error adding complaint: ', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.complaintItem}>
      <Text>{item.title}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaints</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new complaint"
          value={newComplaint}
          onChangeText={setNewComplaint}
        />
        <Button title="Submit" onPress={handleSubmitComplaint} />
      </View>
      <FlatList
        data={complaints}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  complaintItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

