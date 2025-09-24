import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ProtectedRoute from '../components/ProtectedRoute';
import { Ionicons } from '@expo/vector-icons';

function CRUDContent() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load books from local storage on mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  };

  const saveBooks = (updatedBooks) => {
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const handleCreate = () => {
    if (!title || !author || !genre) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre,
      createdAt: new Date().toISOString(),
    };

    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
    setTitle('');
    setAuthor('');
    setGenre('');
    Alert.alert('Success', 'Book created successfully!');
  };

  const handleUpdate = () => {
    if (!title || !author || !genre) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedBooks = books.map(book =>
      book.id === editingId ? { ...book, title, author, genre } : book
    );
    saveBooks(updatedBooks);
    setTitle('');
    setAuthor('');
    setGenre('');
    setEditingId(null);
    Alert.alert('Success', 'Book updated successfully!');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedBooks = books.filter(book => book.id !== id);
            saveBooks(updatedBooks);
            Alert.alert('Success', 'Book deleted successfully!');
          },
        },
      ]
    );
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setEditingId(book.id);
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>by {item.author}</Text>
        <Text style={styles.bookGenre}>Genre: {item.genre}</Text>
        <Text style={styles.bookDate}>Added: {new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.bookActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>🔧 CRUD Operations 🔧</Text>
            <Text style={styles.subtitle}>Manage your book collection with Create, Read, Update, Delete</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>
              {editingId ? '✏️ Edit Book' : '📝 Add New Book'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Book Title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Author"
              value={author}
              onChangeText={setAuthor}
            />

            <TextInput
              style={styles.input}
              placeholder="Genre"
              value={genre}
              onChangeText={setGenre}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={editingId ? handleUpdate : handleCreate}
            >
              <Text style={styles.primaryButtonText}>
                {editingId ? 'Update Book' : 'Create Book'}
              </Text>
            </TouchableOpacity>

            {editingId && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setEditingId(null);
                  setTitle('');
                  setAuthor('');
                  setGenre('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>📚 Your Books ({books.length})</Text>

            {books.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No books yet! Add your first book above.</Text>
              </View>
            ) : (
              <FlatList
                data={books}
                renderItem={renderBook}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function CRUD() {
  return (
    <ProtectedRoute>
      <CRUDContent />
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2D8CFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listSection: {
    marginBottom: 30,
  },
  bookItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bookGenre: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  bookDate: {
    fontSize: 12,
    color: '#aaa',
  },
  bookActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
