import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Already have an account? Login" onPress={() => navigation.replace('login')} />
    </View>
  );
}
