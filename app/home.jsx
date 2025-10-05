import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function HomeContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuVisible(false);
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      setMenuVisible(false);
    }
  };

  return (
    <LinearGradient
      colors={["#2D8CFF", "#FF2D55"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>📖 Bible Study 📖</Text>
              <Text style={styles.purposeText}>
                Bible Study: Daily companion for spiritual growth through God's Word.
                 Read, reflect, and apply Scripture. Begin with inspirational verses and explore books for reflection.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.menuTrigger}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={styles.menuTriggerText}>☰</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={[styles.menuButton, styles.button1]}
              onPress={() => router.push('/daily')}
            >
              <Text style={styles.menuButtonText}>📖 Daily Verse</Text>
              <Text style={styles.menuButtonSubtext}>Get today's inspirational Bible verse and reflection</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.button2]}
              onPress={() => router.push('/books')}
            >
              <Text style={styles.menuButtonText}>📚 Read Bible</Text>
              <Text style={styles.menuButtonSubtext}>Explore books, chapters, and verses with highlights</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={menuVisible}
          transparent={true}
          onRequestClose={() => setMenuVisible(false)}
          animationType="fade"
        >
          <View style={styles.menuModal}>
            <View style={styles.menuContent}>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutItemText}>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
                <Text style={styles.closeItemText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    position: 'relative',
    marginBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0069',
    marginBottom: 10,
  },
  purposeText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  menuContainer: {
    flex: 1,
  },
  menuButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  button1: {
    borderLeftWidth: 4,
    borderLeftColor: '#00BFA5',
  },
  button2: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  menuButtonSubtext: {
    fontSize: 13,
    color: '#777',
  },
  menuTrigger: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  menuTriggerText: {
    color: '#4B0069',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContent: {
    padding: 10,
    borderRadius: 8,
    width: 200,
    minHeight: 80,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#4B0069',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  signOutItemText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  closeItemText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
