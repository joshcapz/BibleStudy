import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "../context/AuthContext"
import { GoalsProvider } from "../context/GoalsContext"

export default function RootLayout() {
  return (
    <AuthProvider>
      <GoalsProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="signup" options={{ title: 'Sign Up', headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ title: 'Sign Up', headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="home" options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen name="goals" options={{ title: 'Goals', headerShown: false }} />
        </Stack>
      </GoalsProvider>
    </AuthProvider>
  )
}
