import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { GoalsProvider } from '../../context/GoalsContext'

export default function GoalsLayout() {
  return (
    <GoalsProvider>
      <Tabs
        initialRouteName="create" // Set "create" as the default route
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        }}>
        
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Goal',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'create' : 'create-outline'}
                color="black"
              />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  )
}