import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { createContext, useState } from "react"
import { db } from "../firebaseConfig"

export const GoalsContext = createContext()

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([])

  async function fetchGoals() {
    const snapshot = await getDocs(collection(db, 'goals'));
    const goalsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGoals(goalsList);
  }
 
  async function createGoal(goalData) {
    console.log(goalData)
    await addDoc(collection(db, 'goals'), goalData)
  }

  async function deleteGoal(id) {
    await deleteDoc(doc(db, 'goals', id));
    setGoals(goals => goals.filter(goal => goal.id !== id));
  }

  async function updateGoal(id, updatedData) {
    await updateDoc(doc(db, 'goals', id), updatedData);
    setGoals(goals => goals.map(goal => goal.id === id ? { ...goal, ...updatedData } : goal));
  }

  return (
    <GoalsContext.Provider
      value={{ goals, fetchGoals, createGoal, deleteGoal, updateGoal }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

