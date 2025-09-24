import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Create Account');
  const [successMessage, setSuccessMessage] = useState('');

  const { error, clearError } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!confirmPassword.trim()) {
      Alert.alert('Error', 'Please confirm your password');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setButtonText('Saving...');
    clearError();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      setSuccessMessage('Saved');
      setTimeout(() => {
        setSuccessMessage('');
        Alert.alert(
          'Success',
          'Account created successfully! Please log in.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      }, 2000);
    } catch (err) {
      let errorMessage = 'Sign up failed. Please try again.';

      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        default:
          errorMessage = err.message;
      }

      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setLoading(false);
      setButtonText('Create Account');
    }
  };

  const handleSignInPress = () => {
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background GIF */}
      <Image
        source={{
          uri:
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWp1ZGMwZDB4NnM5Y2tiOXc0a2dxZG5iZTA3d2Z1eXN6NWppYW5r2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT77Y1T0zY1gR5qe5O/giphy.gif',
        }}
        style={styles.backgroundGif}
        resizeMode="cover"
        blurRadius={2} // Optional, softens the background
      />  

      <View style={styles.content}>
        <Text style={styles.title}>𝐂𝐫𝐞𝐚𝐭𝐞 𝐀𝐜𝐜𝐨𝐮𝐧𝐭</Text>
        <Text style={styles.subtitle}>𝐒𝐢𝐠𝐧 𝐮𝐩 𝐭𝐨 𝐠𝐞𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="𝐄𝐦𝐚𝐢𝐥"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <TextInput
            style={styles.input}
            placeholder="𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password-new"
          />
          <TextInput
            style={styles.input}
            placeholder="𝐂𝐨𝐧𝐟𝐢𝐫𝐦 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete="password-new"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>{buttonText}</Text>
          )}
        </TouchableOpacity>

        {successMessage ? (
          <View style={styles.successOverlay}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.linkButton}
          onPress={handleSignInPress}
        >
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0069',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGif: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
    height: 500,
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 4, 38, 0.7)',
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00AB53',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    color: '#000',
  },
  errorText: {
    color: '#FF2D55',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successText: {
    color: '#00AB53',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4B0069',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#4B0069',
    fontWeight: '600',
  },
});
