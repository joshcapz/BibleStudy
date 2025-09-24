import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useGoals } from '../hooks/useGoals';
import ProtectedRoute from '../components/ProtectedRoute';
import { Ionicons } from '@expo/vector-icons';

function ProfileContent() {
  const { user, signOut } = useAuth();
  const { goals } = useGoals();
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/');
          } catch (error) {
            Alert.alert('Error', 'Failed to sign out. Please try again.');
          }
        }
        }
      ]
    );
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const getPriorityStats = () => {
    const stats = {
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    goals.forEach(goal => {
      if (stats.hasOwnProperty(goal.priority)) {
        stats[goal.priority]++;
      }
    });

    return stats;
  };

  const priorityStats = getPriorityStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          <Text style={styles.nameText}>📖 {user?.email || 'User'} 📖</Text>
          <Text style={styles.emailText}>Your bookish journey awaits!</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>🚀 Your Bookish Progress 🚀</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalGoals}</Text>
                <Text style={styles.statLabel}>Total Goals</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{completedGoals}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{completionRate}%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </View>

          {/* Goals by Priority */}
          <View style={styles.prioritySection}>
            <Text style={styles.sectionTitle}>📚 Goals by Priority 📚</Text>

            <View style={styles.priorityList}>
              <View style={styles.priorityItem}>
                <View style={[styles.priorityDot, { backgroundColor: '#f44336' }]} />
                <Text style={styles.priorityText}>Urgent: {priorityStats.urgent}</Text>
              </View>

              <View style={styles.priorityItem}>
                <View style={[styles.priorityDot, { backgroundColor: '#ff9800' }]} />
                <Text style={styles.priorityText}>High: {priorityStats.high}</Text>
              </View>

              <View style={styles.priorityItem}>
                <View style={[styles.priorityDot, { backgroundColor: '#2196f3' }]} />
                <Text style={styles.priorityText}>Medium: {priorityStats.medium}</Text>
              </View>

              <View style={styles.priorityItem}>
                <View style={[styles.priorityDot, { backgroundColor: '#4caf50' }]} />
                <Text style={styles.priorityText}>Low: {priorityStats.low}</Text>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>🎯 Goal Categories 🎯</Text>

            {['personal', 'health', 'career', 'education', 'finance', 'relationships', 'hobby', 'other'].map(category => {
              const count = goals.filter(goal => goal.category === category).length;
              if (count === 0) return null;

              return (
                <View key={category} style={styles.categoryItem}>
                  <Text style={styles.categoryText}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}: {count}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/goals')}
            >
              <Ionicons name="list" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>📚 View All Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/goals/create')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>✨ Create New Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.signOutButton]}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>🚪 Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
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
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2D8CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D8CFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  prioritySection: {
    marginBottom: 30,
  },
  priorityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityText: {
    fontSize: 16,
    color: '#333',
  },
  categoriesSection: {
    marginBottom: 30,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#2D8CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#f44336',
  },
});
