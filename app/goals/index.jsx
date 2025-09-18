
import { useEffect } from 'react'
import { FlatList, View, Text, StyleSheet, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'

const Goals = () => {
  const { goals, fetchGoals, deleteGoal } = useGoals()

  useEffect(() => {
    fetchGoals()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.goal}</Text>
            <Button title="Delete" color="red" onPress={() => deleteGoal(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center'}}>No goals yet.</Text>}
      />
    </SafeAreaView>
  )
}

export default Goals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
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