import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.replace('signup')} />
    </View>
  );
}
