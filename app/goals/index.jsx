import React, { useEffect } from 'react'
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'
import { useRouter } from 'expo-router'

const Goals = () => {
  const { goals, fetchGoals, deleteGoal } = useGoals()
  const router = useRouter()

  useEffect(() => {
    fetchGoals()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Goals</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/goals/create')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.goal}</Text>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteGoal(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>No goals yet.</Text>
        }
      />
    </SafeAreaView>
  )
}

export default Goals

// Updated options to remove the "index" text
export const options = {
  headerShown: false, // Ensures the header is hidden
  title: '', // Removes the "index" title
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#F5274D',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  goalText: {
    fontSize: 18,
    flex: 1,
  },
})
