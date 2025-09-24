import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy, where } from "firebase/firestore"
import { createContext, useState } from "react"
import { db } from "../firebaseConfig"
import { useAuth } from "./AuthContext"

export const GoalsContext = createContext()

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const clearError = () => setError(null)

  async function fetchGoals() {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const q = query(
        collection(db, 'goals'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const goalsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }))
      setGoals(goalsList)
    } catch (err) {
      setError('Failed to fetch goals. Please try again.')
      console.error('Error fetching goals:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createGoal(goalData) {
    if (!user) {
      setError('You must be logged in to create goals')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const goalWithUser = {
        ...goalData,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: goalData.progress || 0,
        completed: false
      }

      await addDoc(collection(db, 'goals'), goalWithUser)
      await fetchGoals() // Refresh the list
    } catch (err) {
      setError('Failed to create goal. Please try again.')
      console.error('Error creating goal:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateGoal(id, updatedData) {
    if (!user) {
      setError('You must be logged in to update goals')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const updateData = {
        ...updatedData,
        updatedAt: new Date()
      }

      await updateDoc(doc(db, 'goals', id), updateData)
      setGoals(goals => goals.map(goal =>
        goal.id === id ? { ...goal, ...updateData } : goal
      ))
    } catch (err) {
      setError('Failed to update goal. Please try again.')
      console.error('Error updating goal:', err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteGoal(id) {
    if (!user) {
      setError('You must be logged in to delete goals')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await deleteDoc(doc(db, 'goals', id))
      setGoals(goals => goals.filter(goal => goal.id !== id))
    } catch (err) {
      setError('Failed to delete goal. Please try again.')
      console.error('Error deleting goal:', err)
    } finally {
      setLoading(false)
    }
  }

  async function toggleGoalCompletion(id) {
    const goal = goals.find(g => g.id === id)
    if (!goal) return

    await updateGoal(id, {
      completed: !goal.completed,
      progress: !goal.completed ? 100 : 0
    })
  }

  async function updateGoalProgress(id, progress) {
    await updateGoal(id, { progress: Math.max(0, Math.min(100, progress)) })
  }

  return (
    <GoalsContext.Provider
      value={{
        goals,
        loading,
        error,
        clearError,
        fetchGoals,
        createGoal,
        updateGoal,
        deleteGoal,
        toggleGoalCompletion,
        updateGoalProgress
      }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

