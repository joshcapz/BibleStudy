import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoute from '../components/ProtectedRoute';

const verses = [
  {
    text: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    reflection: "Reflect on God's promises for your life today.",
  },
  {
    text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    reference: "Psalm 23:1-2",
    reflection: "Find peace in God's guidance.",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    reflection: "Draw strength from God's presence.",
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    reflection: "Surrender your plans to God for clear direction.",
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
    reflection: "Find rest in Jesus amid life's burdens.",
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    reflection: "Draw power from Christ for every challenge.",
  },
  // Add more verses as needed
];

export default function Daily() {
  const router = useRouter();
  const [randomVerse, setRandomVerse] = useState(verses[Math.floor(Math.random() * verses.length)]);

  const handleNewVerse = () => {
    const newVerse = verses[Math.floor(Math.random() * verses.length)];
    setRandomVerse(newVerse);
  };

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.title}>Daily Verse</Text>
        </View>
        <Text style={styles.subtitle}>Inspiration for your study today</Text>

        <View style={styles.verseContainer}>
          <Text style={styles.verseText}>"{randomVerse.text}"</Text>
          <Text style={styles.reference}>- {randomVerse.reference}</Text>
        </View>

        <View style={styles.reflectionContainer}>
          <Text style={styles.reflectionTitle}>Reflection</Text>
          <Text style={styles.reflectionText}>{randomVerse.reflection}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleNewVerse}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>New Verse</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F3FF',
    padding: 20,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0069',
    flex: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  verseContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0D7FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  verseText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 26,
    fontFamily: 'serif',
  },
  reference: {
    fontSize: 16,
    color: '#4B0069',
    textAlign: 'center',
    fontWeight: '600',
  },
  reflectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  reflectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0069',
    marginBottom: 10,
  },
  reflectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#4B0069',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: '#4B0069',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
