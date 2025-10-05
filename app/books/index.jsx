import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SectionList,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoute from '../../components/ProtectedRoute';

const oldTestament = [
  { id: 'genesis', title: 'Genesis', chapters: 50 },
  { id: 'exodus', title: 'Exodus', chapters: 40 },
  { id: 'leviticus', title: 'Leviticus', chapters: 27 },
  { id: 'numbers', title: 'Numbers', chapters: 36 },
  { id: 'deuteronomy', title: 'Deuteronomy', chapters: 34 },
  { id: 'joshua', title: 'Joshua', chapters: 24 },
  { id: 'judges', title: 'Judges', chapters: 21 },
  { id: 'ruth', title: 'Ruth', chapters: 4 },
  { id: '1samuel', title: '1 Samuel', chapters: 31 },
  { id: '2samuel', title: '2 Samuel', chapters: 24 },
  { id: '1kings', title: '1 Kings', chapters: 22 },
  { id: '2kings', title: '2 Kings', chapters: 25 },
  { id: '1chronicles', title: '1 Chronicles', chapters: 29 },
  { id: '2chronicles', title: '2 Chronicles', chapters: 36 },
  { id: 'ezra', title: 'Ezra', chapters: 10 },
  { id: 'nehemiah', title: 'Nehemiah', chapters: 13 },
  { id: 'esther', title: 'Esther', chapters: 10 },
  { id: 'job', title: 'Job', chapters: 42 },
  { id: 'psalms', title: 'Psalms', chapters: 150 },
  { id: 'proverbs', title: 'Proverbs', chapters: 31 },
  { id: 'ecclesiastes', title: 'Ecclesiastes', chapters: 12 },
  { id: 'songofsolomon', title: 'Song of Solomon', chapters: 8 },
  { id: 'isaiah', title: 'Isaiah', chapters: 66 },
  { id: 'jeremiah', title: 'Jeremiah', chapters: 52 },
  { id: 'lamentations', title: 'Lamentations', chapters: 5 },
  { id: 'ezekiel', title: 'Ezekiel', chapters: 48 },
  { id: 'daniel', title: 'Daniel', chapters: 12 },
  { id: 'hosea', title: 'Hosea', chapters: 14 },
  { id: 'joel', title: 'Joel', chapters: 3 },
  { id: 'amos', title: 'Amos', chapters: 9 },
  { id: 'obadiah', title: 'Obadiah', chapters: 1 },
  { id: 'jonah', title: 'Jonah', chapters: 4 },
  { id: 'micah', title: 'Micah', chapters: 7 },
  { id: 'nahum', title: 'Nahum', chapters: 3 },
  { id: 'habakkuk', title: 'Habakkuk', chapters: 3 },
  { id: 'zephaniah', title: 'Zephaniah', chapters: 3 },
  { id: 'haggai', title: 'Haggai', chapters: 2 },
  { id: 'zechariah', title: 'Zechariah', chapters: 14 },
  { id: 'malachi', title: 'Malachi', chapters: 4 },
];

const newTestament = [
  { id: 'matthew', title: 'Matthew', chapters: 28 },
  { id: 'mark', title: 'Mark', chapters: 16 },
  { id: 'luke', title: 'Luke', chapters: 24 },
  { id: 'john', title: 'John', chapters: 21 },
  { id: 'acts', title: 'Acts', chapters: 28 },
  { id: 'romans', title: 'Romans', chapters: 16 },
  { id: '1corinthians', title: '1 Corinthians', chapters: 16 },
  { id: '2corinthians', title: '2 Corinthians', chapters: 13 },
  { id: 'galatians', title: 'Galatians', chapters: 6 },
  { id: 'ephesians', title: 'Ephesians', chapters: 6 },
  { id: 'philippians', title: 'Philippians', chapters: 4 },
  { id: 'colossians', title: 'Colossians', chapters: 4 },
  { id: '1thessalonians', title: '1 Thessalonians', chapters: 5 },
  { id: '2thessalonians', title: '2 Thessalonians', chapters: 3 },
  { id: '1timothy', title: '1 Timothy', chapters: 6 },
  { id: '2timothy', title: '2 Timothy', chapters: 4 },
  { id: 'titus', title: 'Titus', chapters: 3 },
  { id: 'philemon', title: 'Philemon', chapters: 1 },
  { id: 'hebrews', title: 'Hebrews', chapters: 13 },
  { id: 'james', title: 'James', chapters: 5 },
  { id: '1peter', title: '1 Peter', chapters: 5 },
  { id: '2peter', title: '2 Peter', chapters: 3 },
  { id: '1john', title: '1 John', chapters: 5 },
  { id: '2john', title: '2 John', chapters: 1 },
  { id: '3john', title: '3 John', chapters: 1 },
  { id: 'jude', title: 'Jude', chapters: 1 },
  { id: 'revelation', title: 'Revelation', chapters: 22 },
];

const allSections = [
  { title: 'Old Testament', data: oldTestament },
  { title: 'New Testament', data: newTestament },
];

function BooksContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = allSections.map(section => ({
    title: section.title,
    data: section.data.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.data.length > 0);

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => router.push(`/books/${item.id}`)}
    >
      <View style={styles.bookInfo}>
        <Ionicons name="book-outline" size={20} color="#4B0069" />
        <View style={styles.bookText}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.chaptersText}>{item.chapters} chapters</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push(`/books/${item.id}`)} activeOpacity={0.7}>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#2D8CFF", "#FF2D55"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#4B0069" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        {filteredSections.length > 0 ? (
          <SectionList
            sections={filteredSections}
            keyExtractor={(item) => item.id}
            renderItem={renderBook}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.noResults}>
            <Ionicons name="search-off" size={50} color="#999" />
            <Text style={styles.noResultsText}>No books found</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

export default function Books() {
  return (
    <ProtectedRoute>
      <BooksContent />
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0069',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookText: {
    marginLeft: 15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  chaptersText: {
    fontSize: 14,
    color: '#777',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});
