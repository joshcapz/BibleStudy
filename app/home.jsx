import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function HomeContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.welcomeText}>🌟 Welcome to BookLife! 🌟</Text>
        <Text style={styles.emailText}>Ready to dive into your book adventure, {user?.email}?</Text>
      </Animated.View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuButton, styles.button1]}
          onPress={() => router.push('/goals')}
        >
          <Text style={styles.menuButtonText}>📚 My Books</Text>
          <Text style={styles.menuButtonSubtext}>Track and manage your books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button2]}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.menuButtonText}>🚀 My Profile</Text>
          <Text style={styles.menuButtonSubtext}>Customize your bookish identity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button3]}
          onPress={() => router.push('/goals')}
        >
          <Text style={styles.menuButtonText}>🔥 Discover Books</Text>
          <Text style={styles.menuButtonSubtext}>Find your next favorite read</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button4]}
          onPress={() => router.push('/goals')}
        >
          <Text style={styles.menuButtonText}>⚡ Reading Challenges</Text>
          <Text style={styles.menuButtonSubtext}>Level up your reading game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button5]}
          onPress={() => router.push('/goals')}
        >
          <Text style={styles.menuButtonText}>🎉 Book Reviews</Text>
          <Text style={styles.menuButtonSubtext}>Share your thoughts on books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button6]}
          onPress={() => router.push('/challenges')}
        >
          <Text style={styles.menuButtonText}>⚡ Reading Challenges</Text>
          <Text style={styles.menuButtonSubtext}>Level up your reading game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.button7]}
          onPress={() => router.push('/crud')}
        >
          <Text style={styles.menuButtonText}>🔧 CRUD Operations</Text>
          <Text style={styles.menuButtonSubtext}>Create, Read, Update, Delete books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutButtonText}>🚪 Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F3FF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B0069',
    marginBottom: 6,
  },
  emailText: {
    fontSize: 16,
    color: '#888',
  },
  menuContainer: {
    flex: 1,
  },
  menuButton: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  button1: {
    borderLeftWidth: 5,
    borderLeftColor: '#00BFA5',
  },
  button2: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFD700',
  },
  button3: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF5722',
  },
  button4: {
    borderLeftWidth: 5,
    borderLeftColor: '#9C27B0',
  },
  button5: {
    borderLeftWidth: 5,
    borderLeftColor: '#E91E63',
  },
  button6: {
    borderLeftWidth: 5,
    borderLeftColor: '#3F51B5',
  },
  button7: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  menuButtonSubtext: {
    fontSize: 14,
    color: '#777',
  },
  signOutButton: {
    backgroundColor: '#4B0069',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
